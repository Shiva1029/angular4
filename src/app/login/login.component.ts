import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LOGIN} from '../reducers/login';
import {LoginState} from '../reducers/login-state';
import {LoginService} from './login.service';
import {LoginObj} from './login-obj';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginObj = new LoginObj();
    errorMessage = '';
    successMessage = '';
    email = '';
    pwd = '';
    rememberMe = false;
    loading = false;
    login: Observable<boolean>;

    constructor(private router: Router, private userLoginSer: LoginService, private store: Store<LoginState>) {
        this.login = store.select('login');
        this.login.subscribe(response => {
                if (response) {
                    this.router.navigate(['/userHome']);
                }
            }, err => {
                // console.log(err);
            }
        );
    }

    ngOnInit(): void {
    }

    onLoginSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        if (this.errorMessage === '') {
            this.loginObj.email = this.email;
            this.loginObj.pwd = this.pwd;
            this.userLoginSer.submitUser(this.loginObj)
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.setCookie('token', returnObj.jwt, 30);
                            this.loginCall();
                            this.userLoginSer.onLogin();
                            this.router.navigate(['/userHome']);
                            this.loading = false;
                            this.successMessage = returnObj.message;
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => this.errorMessage = <any>error);
            this.loading = false;
        }
    }

    setCookie(cname, cvalue, mins): void {
        const d = new Date();
        d.setTime(d.getTime() + (mins * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    loginCall() {
        this.store.dispatch({type: LOGIN});
    }
}

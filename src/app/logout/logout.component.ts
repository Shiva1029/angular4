import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LOGIN, LOGOUT} from '../reducers/login';
import {LoginState} from '../reducers/login-state';
import {LoginService} from '../login/login.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    errorMessage = '';
    successMessage = false;
    loading = false;
    login: Observable<boolean>;

    constructor(private router: Router, private userLogoutSer: LoginService, private store: Store<LoginState>) {
        this.login = store.select('login');
        this.login.subscribe(response => {
                if (!response) {
                    this.router.navigate(['/login']);
                }
            }, err => {
                // console.log(err);
            }
        );
    }

    ngOnInit() {
        this.onLoginSubmit();
    }

    onLoginSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        if (this.errorMessage === '') {
            this.userLogoutSer.logoutUser()
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.deleteCookie('token');
                            this.logout();
                            this.userLogoutSer.onLogout();
                            this.loading = false;
                            this.successMessage = true;
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => this.errorMessage = <any>error);
            this.loading = false;
        }
    }

    deleteCookie(name) {
        document.cookie = name + '=;expires=' + new Date(1970, 0, 1).toUTCString() + ';path=/';
    }

    logout() {
        this.store.dispatch({type: LOGOUT});
    }
}

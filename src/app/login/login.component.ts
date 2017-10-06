import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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

    constructor(private router: Router, private userLoginSer: LoginService) {
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
                        this.setCookie('token', returnObj.jwt, 30);
                        this.router.navigate(['/userHome']);
                        this.loading = false;
                        this.successMessage = returnObj.message;
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
}

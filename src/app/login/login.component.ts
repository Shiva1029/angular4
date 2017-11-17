import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {LOGIN} from '../reducers/login';
import {LoginState} from '../reducers/login-state';
import {LoginService} from './login.service';
import {LoginObj} from './login-obj';
import {ForgotPwd} from './forgot-pwd';

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
    loading = false;
    login: Observable<boolean>;
    showFP = false;
    recaptchaStr = '';
    recaptchaStrF = '';
    fp = new ForgotPwd();

    constructor(private router: Router, private userLoginSer: LoginService, private store: Store<LoginState>) {
        this.login = store.select('login');
    }

    ngOnInit(): void {
    }

    onLoginSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        if (this.errorMessage === '') {
            this.loginObj.email = this.email;
            this.loginObj.pwd = this.pwd;
            this.loginObj.recaptcha = this.recaptchaStr;
            this.userLoginSer.submitUser(this.loginObj)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            if (returnObj.type === 'user') {
                                this.userLoginSer.user = true;
                            } else {
                                this.userLoginSer.user = false;
                            }
                            this.setCookie('token', returnObj.jwt, 30);
                            this.setCookie('type', returnObj.type, 30);
                            this.loginCall();
                            this.userLoginSer.onLogin();
                            this.router.navigate([this.userLoginSer.redirectUrl]);
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    });
        }
    }

    onLoginClick(captchaRef: any): void {
        if (this.recaptchaStr) {
            captchaRef.reset();
        }
        captchaRef.execute();
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

    forgotPasswordClick(): void {
        this.showFP = true;
        this.successMessage = '';
        this.errorMessage = '';
        this.loading = false;
    }

    loginClick(): void {
        this.showFP = false;
        this.successMessage = '';
        this.errorMessage = '';
        this.loading = false;
    }

    isNotValid(): boolean {
        if (!this.validateEmail()) {
            return true;
        }
        return false;
    }

    validateEmail(): boolean {
        if (this.email) {
            const patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return patt.test(this.email);
        }
        return false;
    }

    onFPSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.fp.email = this.email;
        this.fp.recaptcha = this.recaptchaStrF;
        this.userLoginSer.forgotPwd(this.fp)
            .finally(() => {
                this.loading = false;
            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.successMessage = 'An <i class="fa fa-envelope" aria-hidden="true"></i> Email with the link valid for 5 minutes to change your password has been sent.';
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    public resolvedLogin(captchaResponse: string): void {
        this.recaptchaStr = captchaResponse;
        if (this.recaptchaStr) {
            this.onLoginSubmit();
        }
    }

    public resolvedFP(captchaResponse: string): void {
        this.recaptchaStrF = captchaResponse;
        if (this.recaptchaStrF) {
            this.onFPSubmit();
        }
    }
}


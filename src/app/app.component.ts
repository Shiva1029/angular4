import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LOGIN} from './reducers/login';
import {LoginState} from './reducers/login-state';
import {LoginService} from './login/login.service';

import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    login: Observable<boolean>;

    constructor(private appSer: AppService, private userLoginSer: LoginService, private store: Store<LoginState>) {
        this.login = store.select('login');
    }

    ngOnInit(): void {
        const type = this.getCookie('type');
        if (this.getCookie('token') !== '' && type !== '') {
            this.loginCall();
            this.userLoginSer.onLogin(true);
            if (type === 'recruiter') {
                this.userLoginSer.user = false;
            }
        }
    }

    getCookie(cname: string): string {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    loginCall() {
        this.store.dispatch({type: LOGIN});
    }
}

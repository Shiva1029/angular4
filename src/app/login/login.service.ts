import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginObj} from './login-obj';
import {ReturnObj} from './return-obj';
import {LogoutObj} from '../logout/logout-obj';
import {ForgotPwd} from './forgot-pwd';
import {baseUrl} from '../backend';

@Injectable()
export class LoginService {
    user = true;
    isLoggedIn = false;
    // store the URL so we can redirect after logging in
    redirectUrl = '/userHome';

    constructor(private http: HttpClient) {
    }

    submitUser(obj: LoginObj): Observable<ReturnObj> {
        return this.http.post(`${baseUrl}login.php`, obj);
    }

    logoutUser(): Observable<LogoutObj> {
        return this.http.post(`${baseUrl}logout.php`, {});
    }

    onLogin() {
        this.isLoggedIn = true;
    }

    onLogout() {
        this.isLoggedIn = false;
    }

    forgotPwd(obj: ForgotPwd): Observable<any> {
        return this.http.post(`${baseUrl}forgot_password_gen.php`, obj);
    }

}

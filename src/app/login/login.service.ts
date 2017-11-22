import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {LoginObj} from './login-obj';
import {ForgotPwd} from './forgot-pwd';
import {baseUrl} from '../backend';

@Injectable()
export class LoginService {
    private user = new Subject<boolean>();
    user$ = this.user.asObservable();
    userNormal = true;
    isLoggedIn = false;
    // store the URL so we can redirect after logging in
    redirectUrl = '/userHome';

    constructor(private http: HttpClient) {
        this.user.next(true);
    }

    submitUser(obj: LoginObj): Observable<any> {
        return this.http.post(`${baseUrl}login.php`, obj);
    }

    logoutUser(): Observable<any> {
        return this.http.post(`${baseUrl}logout.php`, {});
    }

    onLogin(flag: boolean): void {
        this.isLoggedIn = flag;
    }

    forgotPwd(obj: ForgotPwd): Observable<any> {
        return this.http.post(`${baseUrl}forgot_password_gen.php`, obj);
    }

    setUser(flag: boolean): void {
        this.user.next(flag);
        this.userNormal = flag;
    }

}

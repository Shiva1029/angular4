import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginObj} from './login-obj';
import {ForgotPwd} from './forgot-pwd';
import {baseUrl} from '../backend';

@Injectable()
export class LoginService {
    isAlreadyValid = false;

    constructor(private http: HttpClient) {
    }

    submitUser(obj: LoginObj): Observable<any> {
        return this.http.post(`${baseUrl}login.php`, obj);
    }

    logoutUser(): Observable<any> {
        return this.http.post(`${baseUrl}logout.php`, {});
    }

    onLogin() {
        this.isAlreadyValid = true;
    }

    onLogout() {
        this.isAlreadyValid = false;
    }

    isLoggedIn(): boolean {
        return this.isAlreadyValid;
    }

    forgotPwd(obj: ForgotPwd): Observable<any> {
        return this.http.post(`${baseUrl}forgot_password_gen.php`, obj);
    }

}

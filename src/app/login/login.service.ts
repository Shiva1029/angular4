import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginObj} from './login-obj';
import {baseUrl} from '../backend';

@Injectable()
export class LoginService {
    isAlreadyValid = false;

    constructor(private http: HttpClient) {
    }

    submitUser(obj: LoginObj): Observable<any> {
        return this.http.post(`${baseUrl}login.php`, obj);
        /* .subscribe(res => {
                  console.log(res);
              },
              (err: HttpErrorResponse) => {
                  console.log(err.error);
                  console.log(err.name);
                  console.log(err.message);
                  console.log(err.status);
              });
              */
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

}

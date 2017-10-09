import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginObj} from './login-obj';
import {baseUrl} from '../backend';

@Injectable()
export class LoginService {

     url = `${baseUrl}login.php`;

    constructor(private http: HttpClient) {
    }

    submitUser(obj: LoginObj): Observable<any> {
        return this.http.post(this.url, obj);
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

}

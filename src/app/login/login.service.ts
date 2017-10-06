import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginObj} from './login-obj';
import {ReturnObj} from './return-obj';

@Injectable()
export class LoginService {

    url = 'http://localhost/collegestash/login.php';

    constructor(private http: HttpClient) {
    }

    submitUser(obj: LoginObj): Observable<ReturnObj> {
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

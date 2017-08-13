import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {loginObj} from './loginObj';
import {returnObj} from './returnObj';

@Injectable()
export class UserLoginService {
    url = 'http://localhost/collegestash/userLogin.php';

    constructor(private http: HttpClient) {
    }

    submitUser(obj: loginObj): Observable<returnObj> {
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
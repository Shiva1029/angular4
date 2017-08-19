import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {ReturnObj} from './return-obj';

@Injectable()
export class UserRegistrationService {

    url = 'http://localhost/collegestash/userRegistration.php';

    constructor(private http: HttpClient) {
    }

    submitUser(obj: User): Observable<ReturnObj> {
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

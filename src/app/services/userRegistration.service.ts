import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {user} from './user';
import {returnObj} from './returnObj';

@Injectable()
export class UserRegistrationService {
    url = 'http://localhost/collegestash/userRegistration.php';

    constructor(private http: HttpClient) {
    }

    submitUser(obj: user): Observable<returnObj> {
        return this.http.post(this.url, obj)
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
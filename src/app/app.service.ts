import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {AppObject} from './app-object';
import {baseUrl} from './backend';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {
    }

    submitUser(): Observable<AppObject> {
        return this.http.post<AppObject>(`${baseUrl}isLoggedin.php`, {})
            .do(data => {
            })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        return Observable.throw(err.message);
    }
}

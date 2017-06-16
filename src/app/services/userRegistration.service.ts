import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'

import {user} from './user';
import {returnObj} from './returnObj';

@Injectable()
export class UserRegistrationService {
    url = 'http://localhost/collegestash/userRegistration.php';
    constructor(private http: Http) { }

    submitUser(obj:user): Observable<returnObj> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, obj, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
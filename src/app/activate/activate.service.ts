import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ActObj} from './act-obj';
import {baseUrl} from '../backend';

@Injectable()
export class ActivateService {
    constructor(private http: HttpClient) {
    }

    activateUser(obj: ActObj): Observable<any> {
        return this.http.post(`${baseUrl}activate.php`, obj);
    }

}

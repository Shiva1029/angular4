import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ChgPwdObj} from './chg-pwd-obj';
import {baseUrl} from '../backend';

@Injectable()
export class SettingsService {

    constructor(private http: HttpClient) {
    }

    changePassword(obj: ChgPwdObj): Observable<any> {
        return this.http.post(`${baseUrl}change_password.php`, obj);
    }

}

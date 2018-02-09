import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {ChgPwdObj} from './chg-pwd-obj';

@Injectable()
export class SettingsService {

    constructor(private http: HttpClient) {
    }

    changePassword(obj: ChgPwdObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}change_password.php`, obj);
    }

}

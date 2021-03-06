import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {ForgotObj} from './forgot-obj';

@Injectable()
export class ForgotService {
    constructor(private http: HttpClient) {
    }

    changePwd(obj: ForgotObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}forgot_change_password.php`, obj);
    }

}

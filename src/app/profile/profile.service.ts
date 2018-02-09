import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {ProfileObj} from './profile-obj';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    retrieveUser(): Observable<any> {
        return this.http.post(`${environment.baseUrl}get_profile.php`, {});
    }

    submitUser(obj: ProfileObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}save_profile.php`, obj);
    }
}

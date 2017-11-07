import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {baseUrl} from '../backend';
import {ProfileObj} from './profile-obj';
import {ReturnObj} from './return-obj';
import {ProfileReturnObj} from './profile-return-obj';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    retrieveUser(): Observable<ProfileReturnObj> {
        return this.http.post(`${baseUrl}get_profile.php`, {});
    }

    submitUser(obj: ProfileObj): Observable<ReturnObj> {
        return this.http.post(`${baseUrl}save_profile.php`, obj);
    }
}

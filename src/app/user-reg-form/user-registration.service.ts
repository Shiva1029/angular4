import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {baseUrl} from '../backend';

@Injectable()
export class UserRegistrationService {

    constructor(private http: HttpClient) {
    }

    submitUser(obj: User): Observable<any> {
        return this.http.post(`${baseUrl}userRegistration.php`, obj);
    }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {Recruiter} from './recruiter';
import {ReturnObj} from './return-obj';
import {baseUrl} from '../backend';

@Injectable()
export class UserRegistrationService {

    constructor(private http: HttpClient) {
    }

    submitUser(obj: User): Observable<ReturnObj> {
        return this.http.post(`${baseUrl}userRegistration.php`, obj);
    }

    submitRecruiter(obj: Recruiter): Observable<ReturnObj> {
        return this.http.post(`${baseUrl}recruiterRegistration.php`, obj);
    }

}

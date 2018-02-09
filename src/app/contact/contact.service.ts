import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {ContactObj} from './contact-obj';

@Injectable()
export class ContactService {

    constructor(private http: HttpClient) {
    }

    submitUser(obj: ContactObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}contact.php`, obj);
    }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {baseUrl} from '../backend';

@Injectable()
export class RecruiterHomeService {
    constructor(private http: HttpClient) {
    }
}

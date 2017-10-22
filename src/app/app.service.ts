import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {baseUrl} from './backend';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {
    }
}

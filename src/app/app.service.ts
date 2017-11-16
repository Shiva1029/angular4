import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { do, catch } from 'rxjs/operators';

// import {baseUrl} from './backend';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { do, catch } from 'rxjs/operators';

// import {environment} from '../environments/environment';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {
    }
}

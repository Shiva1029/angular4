import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {baseUrl} from '../backend';
import {JobObj} from './job-obj';

@Injectable()
export class RecruiterHomeService {
    constructor(private http: HttpClient) {
    }

    postJob(obj: JobObj): Observable<any> {
        return this.http.post(`${baseUrl}postJob.php`, obj);
    }

    getJobs(): Observable<any> {
        return this.http.post(`${baseUrl}recruiter_home.php`, {});
    }
}

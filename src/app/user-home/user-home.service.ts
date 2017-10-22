import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JobObj} from './job-obj';
import {baseUrl} from '../backend';

@Injectable()
export class UserHomeService {
    constructor(private http: HttpClient) {
    }

    getJobs(): Observable<any> {
        return this.http.post(`${baseUrl}jobs.php`, {});
    }

    getJob(obj: JobObj): Observable<any> {
        return this.http.post(`${baseUrl}jobs.php`, obj);
    }

    getJobDescription(obj: JobObj): Observable<any> {
        return this.http.post(`${baseUrl}job_detail.php`, obj);
    }

}

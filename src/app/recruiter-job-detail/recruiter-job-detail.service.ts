import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {baseUrl} from '../backend';
import {JobObj} from './job-obj';

@Injectable()
export class RecruiterJobDetailService {
    constructor(private http: HttpClient) {
    }

    getJob(obj: JobObj): Observable<any> {
        return this.http.post(`${baseUrl}recruiter_home.php`, obj);
    }

    getJobDescription(obj: JobObj): Observable<any> {
        return this.http.post(`${baseUrl}job_detail.php`, obj);
    }

    getApplicants(obj: JobObj): Observable<any> {
        return this.http.post(`${baseUrl}applicant_list.php`, obj);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {JobObj} from './job-obj';
import {ApplicantReqObj} from './applicant-req-obj';
import {ToggleObj} from '../recruiter-home/toggle-obj';

@Injectable()
export class RecruiterJobDetailService {
    constructor(private http: HttpClient) {
    }

    getJob(obj: JobObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}recruiter_home.php`, obj);
    }

    getJobDescription(obj: JobObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}job_detail.php`, obj);
    }

    getApplicants(obj: JobObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}applicant_list.php`, obj);
    }

    getApplicant(obj: ApplicantReqObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}applicant_details.php`, obj);
    }

    toggleJob(obj: ToggleObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}toggle_job.php`, obj);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JobObj} from './job-obj';
import {environment} from '../../environments/environment';
import {ApplyJobObj} from '../job-detail/apply-job-obj';

@Injectable()
export class UserHomeService {
    constructor(private http: HttpClient) {
    }

    getJobs(): Observable<any> {
        return this.http.post(`${environment.baseUrl}jobs.php`, {});
    }

    getJob(obj: JobObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}jobs.php`, obj);
    }

    getJobDescription(obj: JobObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}job_detail.php`, obj);
    }

    applyJob(appylJobObj: ApplyJobObj): Observable<any> {
        return this.http.post(`${environment.baseUrl}apply_job.php`, appylJobObj);
    }

}

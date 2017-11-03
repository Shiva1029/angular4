import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {JobObj} from './job-obj';
import {baseUrl} from '../backend';
import {ApplyJobObj} from '../job-detail/apply-job-obj';
import {ApplyJobReturn} from '../job-detail/apply-job-return';

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

    applyJob(appylJobObj: ApplyJobObj): Observable<ApplyJobReturn> {
        return this.http.post(`${baseUrl}apply_job.php`, appylJobObj);
    }

}

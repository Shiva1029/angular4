import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {baseUrl} from '../backend';
import {JobObj} from './job-obj';
import {PostJobReturnObj} from './post-job-return-obj';

@Injectable()
export class RecruiterHomeService {
    constructor(private http: HttpClient) {
    }

    postJob(obj: JobObj): Observable<PostJobReturnObj> {
        return this.http.post(`${baseUrl}postJob.php`, obj);
    }
}

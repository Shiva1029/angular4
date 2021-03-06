import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as $ from 'jquery';
import 'rxjs/add/operator/finally';

import * as PostActions from '../reducers/recruiter-job-actions';
import {RecruiterJobState} from '../reducers/recruiter-job-state';
import {JobStateInterface} from './job-state';
import {JobObj} from './job-obj';
import {JobStateObj} from './job-state-obj';
import {RecruiterHomeService} from './recruiter-home.service';
import {timeAgo} from '../custom-lib/time-ago';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-recruiter-home',
    templateUrl: './recruiter-home.component.html',
    styleUrls: ['./recruiter-home.component.scss']
})
export class RecruiterHomeComponent implements OnInit, OnDestroy {

    loading = false;
    errorMessage = '';
    jobSearch = '';
    job: Observable<RecruiterJobState>;
    jobObj = new JobObj();
    jobs: JobStateObj[];
    recaptchaStr = '';
    sub: Subscription;
    subs: Subscription;

    constructor(private router: Router, private recruiterHomeSer: RecruiterHomeService, private store: Store<JobStateInterface>) {
        this.job = store.select('recruiterJob');
    }

    ngOnInit(): void {
        this.getJobs();
    }

    getJobs(): void {
        this.loading = true;
        this.errorMessage = '';
        this.sub = this.recruiterHomeSer.getJobs()
            .finally(() => {
                this.loading = false;
            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.jobs = returnObj.data;
                        this.convertToLocal();
                    } else if (returnObj.message === 'login') {
                        this.router.navigate(['/login']);
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    convertToLocal(): void {
        for (let i = 0; i < this.jobs.length; i++) {
            this.jobs[i].time = timeAgo(new Date(parseInt(this.jobs[i].time, 10) * 1000));
        }
    }

    setJob(obj: RecruiterJobState): void {
        this.store.dispatch(new PostActions.AddJobPost(obj));
    }

    isNotValid(): boolean {
        if (this.jobObj.title && this.jobObj.zip && this.jobObj.description) {
            if (this.jobObj.title.replace(/[a-z0-9\-\.\/\(\)\\\"\'\@ ]/gi, '') !== '' ||
                this.jobObj.title.length < 6 || this.jobObj.title.length > 36) {
                return true;
            }
            if (this.jobObj.zip.toString().replace(/[0-9]/gi, '') !== '' ||
                this.jobObj.zip < 705 || this.jobObj.zip > 99950) {
                return true;
            }
            if (this.jobObj.description.replace(/[a-z0-9\-\(\)\.\@\+\,\/\?\\\"\' ]/gi, '') !== '' ||
                this.jobObj.description.length < 10 || this.jobObj.description.length > 500) {
                return true;
            }
            return false;
        }
        return true;
    }

    postJob(): void {
        this.jobObj.recaptcha = this.recaptchaStr;
        this.subs = this.recruiterHomeSer.postJob(this.jobObj)
            .finally(() => {
                this.loading = false;

            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.getJobs();
                        $('#postJobModalClose').click();
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    onLoginClick(captchaRef: any): void {
        if (this.recaptchaStr) {
            captchaRef.reset();
        }
        captchaRef.execute();
    }

    public resolvedPJ(captchaResponse: string): void {
        this.recaptchaStr = captchaResponse;
        if (this.recaptchaStr) {
            this.postJob();
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

}

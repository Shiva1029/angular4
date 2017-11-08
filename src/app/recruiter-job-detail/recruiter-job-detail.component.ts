import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {RecruiterJobState} from '../reducers/recruiter-job-state';
import {JobStateInterface} from '../recruiter-home/job-state';
import {JobObj} from './job-obj';
import {ApplicantListObj} from './applicant-list-obj';
import {RecruiterJobDetailService} from './recruiter-job-detail.service';
import {timeAgo} from '../custom-lib/time-ago';

@Component({
    selector: 'app-recruiter-job-detail',
    templateUrl: './recruiter-job-detail.component.html',
    styleUrls: ['./recruiter-job-detail.component.scss']
})
export class RecruiterJobDetailComponent implements OnInit, OnDestroy {
    errorMessage = '';
    successMessage = '';
    loading = false;
    job: Observable<RecruiterJobState>;
    jobSelected: RecruiterJobState;
    jobDescription = '';
    login: Observable<boolean>;
    applicants: ApplicantListObj[];
    applicantSearch = '';
    private selectedId: number;
    private sub: any;
    private jobObjSelected = new JobObj();

    constructor(private route: ActivatedRoute, private router: Router,
                private recruiterJobDetailSer: RecruiterJobDetailService, private store: Store<JobStateInterface>) {
        this.job = store.select('recruiterJob');
        this.job.subscribe(response => {
            if (response) {
                this.jobSelected = <RecruiterJobState>response;
            }
        });
    }

    ngOnInit(): void {
        // check if JOB exists if not send a request.
        this.sub = this.route.params.subscribe(params => {
            // (+) before `params.get()` turns the string into a number
            this.selectedId = +params['id'];
            if (Math.floor(this.selectedId) === this.selectedId && this.selectedId >= 1) {
                if (!this.jobSelected || this.jobSelected.id !== this.selectedId) {
                    this.getJob();
                }
                this.getJobDescription();
                this.getApplicantList();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }


    getJob(): void {
        this.loading = true;
        this.errorMessage = '';
        this.jobObjSelected.job = this.selectedId;
        if (this.errorMessage === '') {
            this.recruiterJobDetailSer.getJob(this.jobObjSelected)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.jobSelected = returnObj.data;
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
    }

    getJobDescription(): void {
        this.loading = true;
        this.errorMessage = '';
        this.jobObjSelected.job = this.selectedId;
        if (this.errorMessage === '') {
            this.recruiterJobDetailSer.getJobDescription(this.jobObjSelected)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.jobDescription = returnObj.data;
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
    }

    getApplicantList(): void {
        this.loading = true;
        this.errorMessage = '';
        this.jobObjSelected.job = this.selectedId;
        if (this.errorMessage === '') {
            this.recruiterJobDetailSer.getApplicants(this.jobObjSelected)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.applicants = returnObj.data;
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
    }

    convertToLocal(): void {
        this.jobSelected.time = timeAgo(new Date(parseInt(this.jobSelected.time, 10) * 1000));
    }

    showApplicant(obj: ApplicantListObj): void {
      // show Applicant by opening a modal. Include jQuery.
    }

}

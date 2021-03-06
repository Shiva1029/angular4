import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {RecruiterJobState} from '../reducers/recruiter-job-state';
import {JobStateInterface} from '../recruiter-home/job-state';
import {JobObj} from './job-obj';
import {ApplicantListObj} from './applicant-list-obj';
import {RecruiterJobDetailService} from './recruiter-job-detail.service';
import {timeAgo} from '../custom-lib/time-ago';
import {ApplicantObj} from './applicant-obj';
import {JobStateObj} from '../recruiter-home/job-state-obj';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-recruiter-job-detail',
    templateUrl: './recruiter-job-detail.component.html',
    styleUrls: ['./recruiter-job-detail.component.scss']
})
export class RecruiterJobDetailComponent implements OnInit, OnDestroy {
    errorMessage = '';
    merrorMessage = '';
    loading = false;
    mloading = false;
    job: Observable<RecruiterJobState>;
    jobSelected: RecruiterJobState;
    jobDescription = '';
    login: Observable<boolean>;
    applicants: ApplicantListObj[];
    applicantSearch = '';
    applicant = new ApplicantObj();
    private selectedId: number;
    private sub: Subscription;
    private subs: Subscription;
    private subss: Subscription;
    private subsss: Subscription;
    private subssss: Subscription;
    private subsssss: Subscription;
    private jobObjSelected = new JobObj();

    constructor(private route: ActivatedRoute, private router: Router,
                private recruiterJobDetailSer: RecruiterJobDetailService, private store: Store<JobStateInterface>) {
        this.job = store.select('recruiterJob');
        this.sub = this.job.subscribe(response => {
            if (response) {
                this.jobSelected = <RecruiterJobState>response;
            }
        });
    }

    ngOnInit(): void {
        // check if JOB exists if not send a request.
        this.route.params.subscribe(params => {
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

    getJob(): void {
        this.loading = true;
        this.errorMessage = '';
        this.jobObjSelected.job = this.selectedId;
        if (this.errorMessage === '') {
            this.subs = this.recruiterJobDetailSer.getJob(this.jobObjSelected)
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
            this.subss = this.recruiterJobDetailSer.getJobDescription(this.jobObjSelected)
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
            this.subsss = this.recruiterJobDetailSer.getApplicants(this.jobObjSelected)
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

    convertToLocals(): void {
        this.applicant.time = timeAgo(new Date(parseInt(this.applicant.time, 10) * 1000));
    }

    showApplicant(obj: ApplicantListObj): void {
        this.mloading = true;
        this.applicant = new ApplicantObj();
        this.subssss = this.recruiterJobDetailSer.getApplicant({'job': this.selectedId, 'user': obj.user_id})
            .finally(() => {
                this.mloading = false;
            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.applicant = returnObj.data;
                        this.convertToLocals();
                    } else if (returnObj.message === 'login') {
                        this.router.navigate(['/login']);
                    } else {
                        this.merrorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.merrorMessage = 'Sorry! Something went wrong!';
                });
    }

    modalOnClose(): void {
        this.applicant = new ApplicantObj();
    }

    toggleJob(job: JobStateObj): void {
        this.loading = true;
        this.subsssss = this.recruiterJobDetailSer.toggleJob({
            'id': this.selectedId,
            'visible': (job.visible === 'y') ? 'n' : 'y'
        })
            .finally(() => {
                this.loading = false;

            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        job.visible = (job.visible === 'y') ? 'n' : 'y';
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.subs) {
            this.subs.unsubscribe();
        }
        if (this.subss) {
            this.subss.unsubscribe();
        }
        if (this.subsss) {
            this.subsss.unsubscribe();
        }
        if (this.subssss) {
            this.subssss.unsubscribe();
        }
        if (this.subsssss) {
            this.subsssss.unsubscribe();
        }
    }

}

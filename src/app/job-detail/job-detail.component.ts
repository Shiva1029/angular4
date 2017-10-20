import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {JobState} from '../reducers/job-state';
import {JobStateInterface} from '../user-home/job-state';
import {UserHomeService} from '../user-home/user-home.service';
import {JobObj} from '../user-home/job-obj';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit, OnDestroy {

    errorMessage = '';
    loading = false;
    job: Observable<JobState>;
    jobSelected: JobState;
    jobDescription = '';
    login: Observable<boolean>;
    private selectedId: number;
    private sub: any;
    private jobObjSelected = new JobObj();

    constructor(private route: ActivatedRoute, private router: Router,
                private userHomeSer: UserHomeService, private store: Store<JobStateInterface>) {
        this.job = store.select('job');
        this.job.subscribe(response => {
                if (response) {
                    this.jobSelected = <JobState>response;
                }
            }, err => {
                // console.log(err);
            }
        );
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
            this.userHomeSer.getJob(this.jobObjSelected)
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.jobSelected = returnObj.data;
                        } else if (returnObj.message === 'login') {
                            this.router.navigate(['/login']);
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }, () => {
                        this.loading = false;
                    });
        }
    }

    getJobDescription(): void {
        this.loading = true;
        this.errorMessage = '';
        this.jobObjSelected.job = this.selectedId;
        if (this.errorMessage === '') {
            this.userHomeSer.getJobDescription(this.jobObjSelected)
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
                    }, () => {
                        this.loading = false;
                    });
        }
    }

}

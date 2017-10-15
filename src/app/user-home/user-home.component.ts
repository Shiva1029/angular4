import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as PostActions from '../reducers/job-actions';
import {JobState} from '../reducers/job-state';
import {JobStateInterface} from './job-state';
import {UserHomeService} from './user-home.service';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
    errorMessage = '';
    jobSearch = '';
    loading = false;
    job: Observable<JobState>;
    jobs: JobState[];

    constructor(private router: Router, private userHomeSer: UserHomeService, private store: Store<JobStateInterface>) {
        this.job = store.select('job');
    }

    ngOnInit(): void {
        this.getJobs();
    }

    getJobs(): void {
        this.loading = true;
        this.errorMessage = '';
        if (this.errorMessage === '') {
            this.userHomeSer.getJobs()
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.jobs = returnObj.data;
                            this.loading = false;
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                            this.loading = false;
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.loading = false;
                    });
        }
    }

    setJob(obj: JobState): void {
        this.store.dispatch(new PostActions.AddJobPost(obj));
    }

}

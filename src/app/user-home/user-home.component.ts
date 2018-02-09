import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import * as PostActions from '../reducers/job-actions';
import {JobState} from '../reducers/job-state';
import {JobStateInterface} from './job-state';
import {UserHomeService} from './user-home.service';
import {timeAgo} from '../custom-lib/time-ago';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit, OnDestroy {
    errorMessage = '';
    jobSearch = '';
    loading = false;
    job: Observable<JobState>;
    jobs: JobState[];
    subs: Subscription;

    constructor(private router: Router, private userHomeSer: UserHomeService, private store: Store<JobStateInterface>) {
        this.job = store.select('job');
    }

    ngOnInit(): void {
        this.getJobs();
    }

    getJobs(): void {
        this.loading = true;
        this.errorMessage = '';
        this.subs = this.userHomeSer.getJobs()
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

    setJob(obj: JobState): void {
        this.store.dispatch(new PostActions.AddJobPost(obj));
    }

    convertToLocal(): void {
        for (let i = 0; i < this.jobs.length; i++) {
            this.jobs[i].time = timeAgo(new Date(parseInt(this.jobs[i].time, 10) * 1000));
        }
    }

    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

}

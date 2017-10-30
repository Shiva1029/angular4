import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import {LOGOUT} from '../reducers/login';
import {LoginState} from '../reducers/login-state';
import {LoginService} from '../login/login.service';
import * as PostActions from '../reducers/job-actions';
import {JobState} from '../reducers/job-state';
import {JobStateInterface} from '../user-home/job-state';
import {JobStateObj} from './job-state-obj';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    errorMessage = '';
    successMessage = false;
    loading = false;
    login: Observable<boolean>;
    job: Observable<JobState>;

    constructor(private router: Router, private userLogoutSer: LoginService, private store: Store<LoginState>, private jobStore: Store<JobStateInterface>) {
        this.login = store.select('login');
        this.job = jobStore.select('job');
    }

    ngOnInit() {
        this.onLoginSubmit();
    }

    onLoginSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        if (this.errorMessage === '') {
            this.userLogoutSer.logoutUser()
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.deleteCookie('token');
                            this.logout();
                            this.userLogoutSer.onLogout();
                            this.setJobToNull(new JobStateObj());
                            this.router.navigate(['/login']);
                            this.successMessage = true;
                        } else if (returnObj.message === 'login') {
                            this.router.navigate(['/login']);
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong';
                    });
        }
    }

    deleteCookie(name) {
        document.cookie = name + '=;expires=' + new Date(1970, 0, 1).toUTCString() + ';path=/';
    }

    logout() {
        this.store.dispatch({type: LOGOUT});
    }

    setJobToNull(obj: JobState): void {
        this.jobStore.dispatch(new PostActions.AddJobPost(obj));
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from './profile.service';
import 'rxjs/add/operator/finally';

import {ProfileObj} from './profile-obj';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    loading = false;
    errorMessage = '';
    successMessage = '';
    profileObj = new ProfileObj();
    changeMade = false;
    subsSer: Subscription;
    subsUser: Subscription;

    constructor(private profileSer: ProfileService) {
    }

    ngOnInit() {
        this.retrieveUser();
    }

    changed(e): void {
        this.changeMade = true;
    }

    retrieveUser(): void {
        this.loading = true;
        this.errorMessage = '';
        this.subsSer = this.profileSer.retrieveUser()
            .finally(() => {
                this.loading = false;
            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.profileObj = returnObj.data;
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    submitUser(): void {
        this.loading = true;
        this.errorMessage = '';
        this.subsUser = this.profileSer.submitUser(this.profileObj)
            .finally(() => {
                this.loading = false;
            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.successMessage = 'Saved!';
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    isNotValid(): boolean {
        if (!this.profileObj.github || !this.profileObj.linkedin || !this.profileObj.portfolio || !this.correctUserName() || !this.correctPortfolio()) {
            return true;
        }
        return false;
    }

    correctUserName(): boolean {
        if (this.profileObj.github && this.profileObj.linkedin) {
            this.profileObj.github = this.profileObj.github.trim();
            this.profileObj.linkedin = this.profileObj.linkedin.trim();
            if (this.profileObj.github.replace(/[a-z0-9/-_]/gi, '') !== '') {
                return false;
            }
            if (this.profileObj.linkedin.replace(/[a-z0-9/-_]/gi, '') !== '') {
                return false;
            }
            return true;
        }
        return false;
    }

    correctPortfolio(): boolean {
        if (this.profileObj.portfolio) {
            if (this.profileObj.portfolio.replace(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, '') !== '') {
                return false;
            }
            return true;
        }
        return false;
    }

    ngOnDestroy() {
        if (this.subsSer) {
            this.subsSer.unsubscribe();
        }
        if (this.subsUser) {
            this.subsUser.unsubscribe();
        }
    }

}

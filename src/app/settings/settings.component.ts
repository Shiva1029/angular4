import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/finally';

import {ChgPwdObj} from './chg-pwd-obj';
import {SettingsService} from './settings.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    errorMessage = '';
    successMessage = '';
    loading = false;
    pwdObj = new ChgPwdObj();
    pwd = '';
    subs: Subscription;

    constructor(private settingsSer: SettingsService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.pwdObj.pwd = this.pwd;
        if (this.errorMessage === '') {
            this.subs = this.settingsSer.changePassword(this.pwdObj)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.successMessage = 'Password has been changed.';
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    });
        }
    }

    isNotValid(): boolean {
        if (!this.passwordStrong()) {
            return true;
        }
        return false;
    }

    passwordStrong(): boolean {
        if (this.pwd) {
            this.pwd = this.pwd.trim();
            if (this.pwd.length < 6 || this.pwd.length > 24) {
                return false;
            }
            if (this.pwd.toLowerCase() === this.pwd) {
                return false;
            }
            if (this.pwd.replace(/[a-z0-9]/gi, '') === '') {
                return false;
            }
            if (this.pwd.replace(/[a-z]/gi, '') === '') {
                return false;
            }
            if (this.pwd.replace(/[0-9]/gi, '') === '') {
                return false;
            }
            return true;
        }
        return false;
    }

    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

}

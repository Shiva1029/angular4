import {Component, OnInit} from '@angular/core';

import {ChgPwdObj} from './chg-pwd-obj';
import {SettingsService} from './settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    errorMessage = '';
    successMessage = '';
    loading = false;
    pwdObj = new ChgPwdObj();
    pwd = '';

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
            this.settingsSer.changePassword(this.pwdObj)
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.successMessage = 'Password has been changed.';
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    },
                    () => {
                        this.loading = false;
                    });
        }
    }

}

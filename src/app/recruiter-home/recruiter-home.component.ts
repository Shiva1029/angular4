import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

import {JobObj} from './job-obj';
import {RecruiterHomeService} from './recruiter-home.service';

@Component({
    selector: 'app-recruiter-home',
    templateUrl: './recruiter-home.component.html',
    styleUrls: ['./recruiter-home.component.scss']
})
export class RecruiterHomeComponent implements OnInit {

    loading = false;
    errorMessage = '';
    jobObj = new JobObj();

    constructor(private router: Router, private recruiterHomeSer: RecruiterHomeService) {
    }

    ngOnInit() {
    }

    isNotValid(): boolean {
        if (this.jobObj.title && this.jobObj.zip && this.jobObj.description) {
            if (this.jobObj.title.replace(/[a-z0-9\-\.\/\\\"\'\@ ]/gi, '') !== '') {
                return true;
            }
            if (this.jobObj.zip.toString().replace(/[0-9]/gi, '') !== '') {
                return true;
            }
            if (this.jobObj.zip < 705 || this.jobObj.zip > 99950) {
                return true;
            }
            if (this.jobObj.description.replace(/[a-z0-9\-\.\@\/\?\\\"\' ]/gi, '') !== '') {
                return true;
            }
            return false;
        }
        return true;
    }

    postJob(): void {
        this.recruiterHomeSer.postJob(this.jobObj)
            .finally(() => {
                this.loading = false;

            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        $('#postJobModalClose').click();
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

}

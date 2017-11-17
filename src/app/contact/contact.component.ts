import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/finally';

import {ContactService} from './contact.service';
import {ContactObj} from './contact-obj';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    loading = false;
    successMessage = '';
    errorMessage = '';
    contactObj = new ContactObj();
    recaptcha = '';

    constructor(private contactSer: ContactService) {
    }

    ngOnInit() {
        this.contactObj.message = '';
    }

    onSubmitUser(): void {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.contactObj.recaptcha = this.recaptcha;
        this.contactSer.submitUser(this.contactObj)
            .finally(() => {
                this.loading = false;
            })
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.contactObj = new ContactObj();
                        this.contactObj.message = '';
                        this.successMessage = 'Your message has been sent successfully!';
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                });
    }

    public resolved(captchaResponse: string): void {
        this.recaptcha = captchaResponse;
        if (this.recaptcha) {
            this.onSubmitUser();
        }
    }

    onSubmitClick(captchaRef: any): void {
        if (this.recaptcha) {
            captchaRef.reset();
        }
        captchaRef.execute();
    }

}

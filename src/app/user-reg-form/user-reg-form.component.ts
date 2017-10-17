import {Component, OnInit} from '@angular/core';

import {UserRegistrationService} from './user-registration.service';
import {User} from './user';

@Component({
    selector: 'app-user-reg-form',
    templateUrl: './user-reg-form.component.html',
    styleUrls: ['./user-reg-form.component.scss']
})
export class UserRegFormComponent implements OnInit {

    userObj = new User();
    fname = '';
    lname = '';
    email = '';
    pwd = '';
    dob = '';
    arr: string[]
    currYear: number
    currMonth: number
    currDate: number
    age: number
    gender: string
    errorMessage = '';
    successMessage = '';
    loading = false;

    constructor(private userRegService: UserRegistrationService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.errorMessage = '';
        this.loading = true;

        this.arr = this.dob.split('-');
        this.currYear = new Date().getFullYear();
        this.currMonth = new Date().getMonth();
        this.currDate = new Date().getDate();

        this.age = this.currYear - parseInt(this.arr[0], 10);
        if (this.currMonth < parseInt(this.arr[1], 10)) {
            this.age--;
        } else if (this.currMonth === parseInt(this.arr[1], 10) && this.currDate < parseInt(this.arr[2], 10)) {
            this.age--;
        }

        if (this.age < 18) {
            this.errorMessage = 'The Minimum age is 18.';
        }

        if (this.errorMessage === '') {
            this.userObj.fname = this.fname;
            this.userObj.lname = this.lname;
            this.userObj.email = this.email;
            this.userObj.pwd = this.pwd;
            this.userObj.dob = this.dob;
            this.userObj.gender = this.gender;

            this.userRegService.submitUser(this.userObj)
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.successMessage = 'An Email with an activation link has been sent!';
                        } else {
                            this.errorMessage = returnObj.message;
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong.';
                    },
                    () => {
                        this.loading = false;
                    });
        }
    }

}

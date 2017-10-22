import {Component, OnInit} from '@angular/core';

import {UserRegistrationService} from './user-registration.service';
import {User} from './user';
import 'rxjs/add/operator/finally';

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
    gender = '';
    errorMessage = '';
    successMessage = '';
    loading = false;
    arr: string[];
    currYear: number;
    currMonth: number;
    currDate: number;
    age: number;

    constructor(private userRegService: UserRegistrationService) {
    }

    ngOnInit(): void {
    }

    emailToLower(e): void {
        this.email = this.email.toLowerCase();
    }

    isNotValid(): boolean {
        if (this.fname === '' ||
            this.lname === '' ||
            this.email === '' || this.pwd === '' || !this.correctName() || !this.correctAge() ||
            !this.correctEdu() || !this.passwordStrong() || this.gender === '') {
            return true;
        }
        return false;
    }

    correctEdu(): boolean {
        if (this.email) {
            const patt = /^[a-z0-9\._\-]{1,34}@.[a-z0-9\._\-]{1,10}.?[a-z0-9\._\-]{0,9}.edu$/i;
            return patt.test(this.email);
        }
        return false;
    }

    correctName(): boolean {
        if (this.fname && this.lname) {
            this.fname = this.fname.trim();
            this.lname = this.lname.trim();
            if (this.fname.replace(/[a-z ]/gi, '') !== '') {
                return false;
            }
            if (this.lname.replace(/[a-z ]/gi, '') !== '') {
                return false;
            }
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

    correctAge(): boolean {
        if (this.dob) {
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

            if (this.age >= 18) {
                return true;
            }
        }
        return false;
    }

    onSubmit(): void {
        this.errorMessage = '';
        this.loading = true;

        if (this.errorMessage === '') {
            this.userObj.fname = this.fname;
            this.userObj.lname = this.lname;
            this.userObj.email = this.email;
            this.userObj.pwd = this.pwd;
            this.userObj.dob = this.dob;
            this.userObj.gender = this.gender;

            this.userRegService.submitUser(this.userObj)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.successMessage = 'An Email with an activation link has been sent!';
                        } else {
                            this.errorMessage = returnObj.message;
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong.';
                    });
        }
    }

}

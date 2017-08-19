import { Component, OnInit } from '@angular/core';

import {UserRegistrationService} from './user-registration.service';
import {User} from './user';
import {ReturnObj} from './return-obj';

@Component({
  selector: 'app-user-reg-form',
  templateUrl: './user-reg-form.component.html',
  styleUrls: ['./user-reg-form.component.scss']
})
export class UserRegFormComponent implements OnInit {

    userObj: User
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
    loading= false;

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
            this.errorMessage = 'Minimum age is 18.';
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
                        this.loading = false;
                        this.successMessage = returnObj.message;
                    },
                    error => this.errorMessage = <any>error);
            this.loading = false;
        }
    }

}

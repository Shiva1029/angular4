import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {UserRegistrationService} from './services/userRegistration.service';
import {user} from './services/user';
import {returnObj} from './services/returnObj';

@Component({
    selector: 'user-reg-form',
    templateUrl: 'templates/userRegistration.html'
    /* styleUrls: ['userRegistration.component.css'] */
})
export class userRegForm implements OnInit {

    userObj = new user();
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
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private userRegService: UserRegistrationService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.arr = this.dob.split('-');
        this.currYear = new Date().getFullYear();
        this.currMonth = new Date().getMonth();
        this.currDate = new Date().getDate();

        this.age = this.currYear - parseInt(this.arr[0]);
        if (this.currMonth < parseInt(this.arr[1]))
            this.age--;
        else if (this.currMonth === parseInt(this.arr[1]) && this.currDate < parseInt(this.arr[2])) {
            this.age--;
        }

        this.userObj.fname = this.fname;
        this.userObj.lname = this.lname;
        this.userObj.email = this.email;
        this.userObj.pwd = this.pwd;
        this.userObj.dob = this.dob;
        this.userObj.gender = this.gender;

        this.userRegService.submitUser(this.userObj)
            .subscribe(returnObj => {
                    this.errorMessage = '';
                    this.successMessage = returnObj.message;
                },
                error => this.errorMessage = <any>error);
    }

}

import {Component} from '@angular/core';

@Component({
    selector: 'user-reg-form',
    templateUrl: 'templates/userRegistration.html',
})
export class userRegForm {
    fname = '';
    dob = '';
    arr: string[]
    currYear: number
    currMonth: number
    currDate: number
    age: number

    onSubmit() {

        this.arr = this.dob.split('-');
        this.currYear = new Date().getFullYear();
        this.currMonth = new Date().getMonth();
        this.currDate = new Date().getDate();

        this.age = this.currYear - parseInt(this.arr[0]);
        if (this.currMonth < parseInt(this.arr[1]))
            this.age--;
        else if (this.currDate < parseInt(this.arr[2])) {
            this.age--;
        }
    }
}

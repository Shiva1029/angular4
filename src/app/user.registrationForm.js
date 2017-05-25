"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var userRegForm = (function () {
    function userRegForm() {
        this.fname = '';
        this.dob = '';
    }
    userRegForm.prototype.onSubmit = function () {
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
    };
    return userRegForm;
}());
userRegForm = __decorate([
    core_1.Component({
        selector: 'user-reg-form',
        templateUrl: 'templates/userRegistration.html',
    })
], userRegForm);
exports.userRegForm = userRegForm;
//# sourceMappingURL=user.registrationForm.js.map
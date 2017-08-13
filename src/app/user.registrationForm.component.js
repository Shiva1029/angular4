"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var userRegistration_service_1 = require("./services/userRegistration.service");
var user_1 = require("./services/user");
var userRegForm = (function () {
    function userRegForm(userRegService) {
        this.userRegService = userRegService;
        this.userObj = new user_1.user();
        this.fname = '';
        this.lname = '';
        this.email = '';
        this.pwd = '';
        this.dob = '';
        this.errorMessage = '';
        this.successMessage = '';
    }
    userRegForm.prototype.ngOnInit = function () {
    };
    userRegForm.prototype.onSubmit = function () {
        var _this = this;
        this.errorMessage = '';
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
            .subscribe(function (returnObj) {
            _this.successMessage = returnObj.message;
        }, function (error) { return _this.errorMessage = error; });
    };
    return userRegForm;
}());
userRegForm = __decorate([
    core_1.Component({
        selector: 'user-reg-form',
        templateUrl: 'templates/userRegistration.html'
    }),
    __metadata("design:paramtypes", [userRegistration_service_1.UserRegistrationService])
], userRegForm);
exports.userRegForm = userRegForm;
//# sourceMappingURL=user.registrationForm.component.js.map
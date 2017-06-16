"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var user_registrationForm_1 = require("./user.registrationForm");
var user_registrationPage_1 = require("./user.registrationPage");
var header_1 = require("./header");
var userRegistration_service_1 = require("./services/userRegistration.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule],
        declarations: [user_registrationPage_1.userRegPage, user_registrationForm_1.userRegForm, header_1.header],
        providers: [userRegistration_service_1.UserRegistrationService],
        bootstrap: [user_registrationPage_1.userRegPage, user_registrationForm_1.userRegForm, header_1.header]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
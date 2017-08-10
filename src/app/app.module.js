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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var main_component_1 = require("./main.component");
var user_registrationForm_component_1 = require("./user.registrationForm.component");
var userRegistration_page_component_1 = require("./userRegistration.page.component");
var header_component_1 = require("./header.component");
var main_routings_module_1 = require("./main.routings.module");
var userRegistration_service_1 = require("./services/userRegistration.service");
var contact_page_component_1 = require("./contact.page.component");
var AppModule = (function () {
    // Diagnostic only: inspect router configuration
    function AppModule(router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, main_routings_module_1.MainRoutingModule],
        declarations: [main_component_1.MainComponent, userRegistration_page_component_1.userRegPage, user_registrationForm_component_1.userRegForm, header_component_1.header, contact_page_component_1.contactUs],
        providers: [userRegistration_service_1.UserRegistrationService],
        bootstrap: [main_component_1.MainComponent]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login.component");
var contact_page_component_1 = require("./contact.page.component");
var userRegistration_page_component_1 = require("./userRegistration.page.component");
var appRoutes = [
    {
        path: '',
        component: login_component_1.login
    },
    {
        path: 'contact',
        component: contact_page_component_1.contactUs
    },
    {
        path: 'signup',
        component: userRegistration_page_component_1.userRegPage
    }
];
var MainRoutingModule = (function () {
    function MainRoutingModule() {
    }
    return MainRoutingModule;
}());
MainRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(appRoutes, {
                enableTracing: true // <-- debugging purposes only
            })
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], MainRoutingModule);
exports.MainRoutingModule = MainRoutingModule;
//# sourceMappingURL=main.routings.module.js.map
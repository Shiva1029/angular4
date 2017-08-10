import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Router} from '@angular/router';

import {MainComponent} from './main.component';
import {userRegForm} from './user.registrationForm.component';
import {userRegPage} from './userRegistration.page.component';
import {header} from './header.component';
import {MainRoutingModule} from './main.routings.module';
import {UserRegistrationService} from './services/userRegistration.service';
import {contactUs} from "./contact.page.component";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, MainRoutingModule],
    declarations: [ MainComponent, userRegPage, userRegForm, header, contactUs],
    providers: [UserRegistrationService],
    bootstrap: [MainComponent]
})
export class AppModule {
// Diagnostic only: inspect router configuration
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}

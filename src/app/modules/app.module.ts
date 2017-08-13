import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

import {MainComponent} from '../components/main.component';
import {login} from '../components/login.component';
import {userHome} from '../components/userHome.component';
import {userRegForm} from '../components/user.registrationForm.component';
import {userRegPage} from '../components/userRegistration.page.component';
import {header} from '../components/header.component';
import {MainRoutingModule} from './main.routings.module';
import {UserRegistrationService} from '../services/userRegistration.service';
import {UserLoginService} from '../services/userLogin.service';
import {contactUs} from "../components/contact.page.component";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, MainRoutingModule],
    declarations: [ MainComponent, userHome, userRegPage, userRegForm, header, contactUs, login],
    providers: [UserRegistrationService, UserLoginService],
    bootstrap: [MainComponent]
})
export class AppModule {
// Diagnostic only: inspect router configuration
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {userRegForm}  from './user.registrationForm';
import {userRegPage}  from './user.registrationPage';
import {header}  from './header';
import {UserRegistrationService} from './services/userRegistration.service';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [userRegPage, userRegForm, header],
    providers: [UserRegistrationService],
    bootstrap: [userRegPage, userRegForm, header]
})
export class AppModule {
}

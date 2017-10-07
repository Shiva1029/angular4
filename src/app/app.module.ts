import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {UserRegFormComponent} from './user-reg-form/user-reg-form.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserRegPageComponent} from './user-reg-page/user-reg-page.component';
import {AuthInterceptor} from './auth-interceptor';
import {LoginService} from './login/login.service';
import {LogoutService} from './logout/logout.service';
import {UserRegistrationService} from './user-reg-form/user-registration.service';
import {LogoutComponent} from './logout/logout.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        HeaderComponent,
        LoginComponent,
        UserRegFormComponent,
        UserHomeComponent,
        UserRegPageComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule, HttpClientModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }, LoginService, LogoutService, UserRegistrationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

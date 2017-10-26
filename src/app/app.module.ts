import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {
    RECAPTCHA_SETTINGS,
    RecaptchaSettings,
    RecaptchaLoaderService,
    RecaptchaModule,
} from 'ng-recaptcha';

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
import {UserRegistrationService} from './user-reg-form/user-registration.service';
import {LogoutComponent} from './logout/logout.component';
import {loginReducer} from './reducers/login';
import {jobReducer} from './reducers/job';
import {AppService} from './app.service';
import {UserHomeService} from './user-home/user-home.service';
import {JobDetailComponent} from './job-detail/job-detail.component';
import {SearchJobsPipe} from './filters/search-jobs.pipe';
import {CheckAuthGuard} from './check-auth.guard';
import {CheckNotAuthGuard} from './check-not-auth.guard';
import {ActivateComponent} from './activate/activate.component';
import {ActivateService} from './activate/activate.service';
import {SettingsComponent} from './settings/settings.component';
import {SettingsService} from './settings/settings.service';
import {ForgotComponent} from './forgot/forgot.component';
import {ForgotService} from './forgot/forgot.service';
import {UserGuard} from './user.guard';
import {RecruiterGuard} from './recruiter.guard';
import { RecruiterHomeComponent } from './recruiter-home/recruiter-home.component';
import { RecruiterHomeService } from './recruiter-home/recruiter-home.service';

const globalSettings: RecaptchaSettings = {siteKey: '6LcFXzUUAAAAAAybdoCt1u0fy7uyy9nI30AG6JC7'};

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        HeaderComponent,
        LoginComponent,
        UserRegFormComponent,
        UserHomeComponent,
        UserRegPageComponent,
        LogoutComponent,
        JobDetailComponent,
        SearchJobsPipe,
        ActivateComponent,
        SettingsComponent,
        ForgotComponent,
        RecruiterHomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({login: loginReducer, job: jobReducer}),
        RecaptchaModule.forRoot(),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }, {
        provide: RECAPTCHA_SETTINGS,
        useValue: globalSettings,
    }, LoginService, UserRegistrationService, AppService, UserHomeService,
        CheckAuthGuard, CheckNotAuthGuard, ActivateService, SettingsService, ForgotService, UserGuard, RecruiterGuard, RecruiterHomeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

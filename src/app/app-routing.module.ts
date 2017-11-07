import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {JobDetailComponent} from './job-detail/job-detail.component';
import {ContactComponent} from './contact/contact.component';
import {SettingsComponent} from './settings/settings.component';
import {ActivateComponent} from './activate/activate.component';
import {UserRegPageComponent} from './user-reg-page/user-reg-page.component';
import {ForgotComponent} from './forgot/forgot.component';
import {CheckAuthGuard} from './check-auth.guard';
import {CheckNotAuthGuard} from './check-not-auth.guard';
import {UserGuard} from './user.guard';
import {RecruiterGuard} from './recruiter.guard';
import {RecruiterHomeComponent} from './recruiter-home/recruiter-home.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'userHome',
        canActivate: [CheckAuthGuard, UserGuard],
        component: UserHomeComponent,
    },
    {
        path: 'recruiterHome',
        canActivate: [CheckAuthGuard, RecruiterGuard],
        component: RecruiterHomeComponent,
    },
    {
        path: 'job/:id',
        canActivate: [CheckAuthGuard, UserGuard],
        component: JobDetailComponent
    },
    {
        path: 'settings',
        canActivate: [CheckAuthGuard],
        component: SettingsComponent,
    },
    {
        path: 'profile',
        canActivate: [CheckAuthGuard, UserGuard],
        component: ProfileComponent,
    },
    {
        path: 'login',
        canActivate: [CheckNotAuthGuard],
        component: LoginComponent
    },
    {
        path: 'logout',
        canActivate: [CheckAuthGuard],
        component: LogoutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'signup',
        canActivate: [CheckNotAuthGuard],
        component: UserRegPageComponent
    },
    {
        path: 'activate/:token',
        canActivate: [CheckNotAuthGuard],
        component: ActivateComponent
    },
    {
        path: 'forgot/:token',
        canActivate: [CheckNotAuthGuard],
        component: ForgotComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

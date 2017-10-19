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
import {CheckAuthGuard} from './check-auth.guard';
import {CheckNotAuthGuard} from './check-not-auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'userHome',
        canActivate: [CheckAuthGuard],
        component: UserHomeComponent,
    },
    {
        path: 'job/:id',
        canActivate: [CheckAuthGuard],
        component: JobDetailComponent
    },
    {
        path: 'settings',
        canActivate: [CheckAuthGuard],
        component: SettingsComponent,
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
        path: 'activate/:id',
        canActivate: [CheckNotAuthGuard],
        component: ActivateComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

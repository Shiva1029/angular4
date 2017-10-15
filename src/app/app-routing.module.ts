import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {JobDetailComponent} from './job-detail/job-detail.component';
import {ContactComponent} from './contact/contact.component';
import {UserRegPageComponent} from './user-reg-page/user-reg-page.component';
import {CheckAuthGuard} from './check-auth.guard';

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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'signup',
        component: UserRegPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {login} from './login.component';
import {contactUs} from './contact.page.component';
import {userRegPage} from './userRegistration.page.component';

const appRoutes: Routes = [
    {
        path: '',
        component: login
    },
    {
        path: 'contact',
        component: contactUs
    },
    {
        path: 'signup',
        component: userRegPage
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {
}
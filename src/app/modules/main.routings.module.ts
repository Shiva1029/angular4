import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {login} from '../components/login.component';
import {userHome} from '../components/userHome.component';
import {contactUs} from '../components/contact.page.component';
import {userRegPage} from '../components/userRegistration.page.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'userHome',
        component: userHome
    },
    {
        path: 'login',
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

/*Adding Children and page not found
{
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
* */

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
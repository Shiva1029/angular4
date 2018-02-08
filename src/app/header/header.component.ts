import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {LoginState} from '../reducers/login-state';
import {LoginService} from '../login/login.service';
import {LinksState} from '../filters/links-state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    headerType: String;
    login: Observable<boolean>;
    showLogout: boolean;
    isUser: boolean;
    stext = '';
    isMobile = false;
    links: LinksState[];
    private subscription: Subscription;
    private lsubs: Subscription;

    constructor(elm: ElementRef, private store: Store<LoginState>, private loginSer: LoginService) {
        this.headerType = elm.nativeElement.getAttribute('headerType');
        this.login = store.select('login');
        this.lsubs = this.login.subscribe(response => {
                this.showLogout = response;
                if (!response) {
                    this.links = [{
                        title: 'Login',
                        link: 'login',
                        meanings: ['account', 'enter']
                    },
                        {
                            title: 'Signup',
                            link: 'signup',
                            meanings: ['register', 'create']
                        }];

                } else if (this.isUser) {
                    this.links = [{
                        title: 'Home',
                        link: 'userHome',
                        meanings: ['back', 'main', 'house']
                    },
                        {
                            title: 'Profile',
                            link: 'profile',
                            meanings: ['github', 'linkedin', 'portfolio', 'links', 'all in one', 'website', 'personal', 'info']
                        },
                        {
                            title: 'Settings',
                            link: 'settings',
                            meanings: ['change password']
                        },
                        {
                            title: 'Contact',
                            link: 'contact',
                            meanings: ['contact', 'email', 'support', 'feedback', 'voice']
                        }];
                } else {
                    this.links = [{
                        title: 'Home',
                        link: 'recruiterHome',
                        meanings: ['back', 'main', 'house']
                    },
                        {
                            title: 'Settings',
                            link: 'settings',
                            meanings: ['change password']
                        },
                        {
                            title: 'Contact',
                            link: 'contact',
                            meanings: ['contact', 'email', 'support', 'feedback', 'voice']
                        }];
                }
            }, err => {
                // console.log(err);
            }
        );

        this.subscription = loginSer.user$
            .subscribe(returnObj => {
                this.isUser = returnObj;
                if (returnObj && this.showLogout) {
                    this.links = [{
                        title: 'Home',
                        link: 'userHome',
                        meanings: ['back', 'main', 'house']
                    },
                        {
                            title: 'Profile',
                            link: 'profile',
                            meanings: ['github', 'linkedin', 'portfolio', 'links', 'all in one', 'website', 'personal', 'info']
                        },
                        {
                            title: 'Settings',
                            link: 'settings',
                            meanings: ['change password']
                        },
                        {
                            title: 'Contact',
                            link: 'contact',
                            meanings: ['contact', 'email', 'support', 'feedback', 'voice']
                        }];
                } else if (!returnObj && this.showLogout) {
                    this.links = [{
                        title: 'Home',
                        link: 'recruiterHome',
                        meanings: ['back', 'main', 'house']
                    },
                        {
                            title: 'Settings',
                            link: 'settings',
                            meanings: ['change password']
                        },
                        {
                            title: 'Contact',
                            link: 'contact',
                            meanings: ['contact', 'email', 'support', 'feedback', 'voice']
                        }];
                }
            });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.lsubs) {
            this.lsubs.unsubscribe();
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

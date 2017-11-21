import {Component, OnInit, ElementRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LoginState} from '../reducers/login-state';
import {LoginService} from '../login/login.service';
import {LinksState} from '../filters/links-state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    headerType: String;
    login: Observable<boolean>;
    showLogout: boolean;
    isUser: boolean;
    stext = '';
    isMobile = false;
    links = [{
        title: 'Login',
        link: 'login',
        meanings: ['account', 'enter']
    },
        {
            title: 'Signup',
            link: 'signup',
            meanings: ['register', 'create']
        }];

    constructor(elm: ElementRef, private store: Store<LoginState>, private loginSer: LoginService) {
        this.headerType = elm.nativeElement.getAttribute('headerType');
        this.login = store.select('login');
        this.login.subscribe(response => {
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

                }
            }, err => {
                // console.log(err);
            }
        );
    }

    ngOnInit() {
        this.isMobile = screen.width > 1135 ? false : true;
        this.loginSer.isUser()
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

    onResize(): void {
        this.isMobile = screen.width > 1135 ? false : true;
    }

}

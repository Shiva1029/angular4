import {Component, OnInit, ElementRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LoginState} from '../reducers/login-state';
import {LoginService} from '../login/login.service';

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

    constructor(elm: ElementRef, private store: Store<LoginState>, private loginSer: LoginService) {
        this.headerType = elm.nativeElement.getAttribute('headerType');
        this.login = store.select('login');
        this.login.subscribe(response => {
                this.showLogout = response;
            }, err => {
                // console.log(err);
            }
        );
        this.isUser = loginSer.user;
    }

    ngOnInit() {
    }

}

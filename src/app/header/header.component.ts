import {Component, OnInit, ElementRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LoginState} from '../reducers/login-state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    headerType: String;
    login: Observable<boolean>;
    showLogout: boolean;

    constructor(elm: ElementRef, private store: Store<LoginState>) {
        this.headerType = elm.nativeElement.getAttribute('headerType');
        this.login = store.select('login');
        this.login.subscribe(response => {
                this.showLogout = response;
            }, err => {
                // console.log(err);
            }
        );
    }

    ngOnInit() {
    }

}

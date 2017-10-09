import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LOGIN} from './reducers/login';
import {LoginState} from './reducers/login-state';
import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    errorMessage = '';
    loading = false;
    login: Observable<boolean>;

    constructor(private checkLoginSer: AppService, private store: Store<LoginState>) {
        this.login = store.select('login');
        this.checkLogin();
    }

    checkLogin(): void {
        this.loading = true;
        this.checkLoginSer.submitUser()
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.loginCall();
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                });
    }

    loginCall() {
        this.store.dispatch({type: LOGIN});
    }
}

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {LoginService} from './login/login.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(private userLoginSer: LoginService) {
    }

    canActivate(): boolean {
        return this.userLoginSer.isLoggedIn();
    }
}
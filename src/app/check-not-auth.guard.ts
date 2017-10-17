import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {LoginService} from './login/login.service';

@Injectable()
export class CheckNotAuthGuard implements CanActivate {
    constructor(private router: Router, private userLoginSer: LoginService) {
    }

    canActivate(): boolean {
        if (!this.userLoginSer.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/userHome']);
            return false;
        }
    }
}
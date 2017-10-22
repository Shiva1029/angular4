import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {LoginService} from './login/login.service';

@Injectable()
export class CheckNotAuthGuard implements CanActivate {

    constructor(private router: Router, private userLoginSer: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userLoginSer.isLoggedIn) { // Navigate to the login page with extras
            this.router.navigate([this.userLoginSer.redirectUrl]);
            return false;
        }

        return true;
    }

}

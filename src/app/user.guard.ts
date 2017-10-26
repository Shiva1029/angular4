import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {LoginService} from './login/login.service';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(private router: Router, private userLoginSer: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.userLoginSer.user) {
            this.router.navigate(['/recruiterHome']);
            return false;
        } else {
            return true;
        }
    }
}

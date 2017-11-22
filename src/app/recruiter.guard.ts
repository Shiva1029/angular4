import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {LoginService} from './login/login.service';

@Injectable()
export class RecruiterGuard implements CanActivate {

    constructor(private router: Router, private userLoginSer: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userLoginSer.userNormal) {
            this.router.navigate(['/userHome']);
            return false;
        } else {
            return true;
        }
    }
}

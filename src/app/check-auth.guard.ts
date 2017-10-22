import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {LoginService} from './login/login.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {

    constructor(private router: Router, private userLoginSer: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.userLoginSer.isLoggedIn) { return true; }

        // Store the attempted URL for redirecting
        this.userLoginSer.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }

}

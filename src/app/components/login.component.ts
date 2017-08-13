import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserLoginService} from '../services/userLogin.service';
import {loginObj} from '../services/loginObj';

@Component({
    templateUrl: 'templates/login.html',
    styleUrls: ['style/login.css']
})

export class login implements OnInit {
    loginObj = new loginObj();
    errorMessage: string = '';
    successMessage: string = '';
    email: string = '';
    pwd: string = '';
    rememberMe: boolean = false;
    loading: boolean = false;

    constructor( private router: Router, private userLoginSer: UserLoginService) {
    }

    ngOnInit(): void {
    }

    onLoginSubmit(): void {
        this.loading = true;
        this.errorMessage = '';
        console.log(this.rememberMe);
        if (this.errorMessage === '') {
            this.loginObj.email = this.email;
            this.loginObj.pwd = this.pwd;
            this.userLoginSer.submitUser(this.loginObj)
                .subscribe(returnObj => {
                        this.router.navigate(['/userHome']);
                        this.loading = false;
                        this.successMessage = returnObj.message;
                    },
                    error => this.errorMessage = <any>error);
            this.loading = false;
        }
    }
}

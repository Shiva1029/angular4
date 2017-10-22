import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/finally';

import {ForgotService} from './forgot.service';
import {ForgotObj} from './forgot-obj';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {

    loading = false;
    errorMessage = '';
    token = '';
    pwd = '';
    private sub: any;
    private fp = new ForgotObj();

    constructor(private route: ActivatedRoute, private router: Router,
                private forgotSer: ForgotService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.token = params['token'];
            if (this.token !== '') {
                this.fp.token = this.token;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    changePwd(): void {
        this.loading = false;
        if (this.fp.token) {
            this.fp.pwd = this.pwd;
            this.forgotSer.changePwd(this.fp)
                .finally(() => {
                    this.loading = false;
                })
                .subscribe(returnObj => {
                        if (returnObj.message === 'OK') {
                            this.router.navigate(['/login']);
                        } else {
                            this.errorMessage = 'Sorry! Something went wrong!';
                        }
                    },
                    error => {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    });
        }
    }

    isNotValid(): boolean {
        if (!this.passwordStrong()) {
            return true;
        }
        return false;
    }

    passwordStrong(): boolean {
        if (this.pwd) {
            this.pwd = this.pwd.trim();
            if (this.pwd.length < 6 || this.pwd.length > 24) {
                return false;
            }
            if (this.pwd.toLowerCase() === this.pwd) {
                return false;
            }
            if (this.pwd.replace(/[a-z0-9]/gi, '') === '') {
                return false;
            }
            if (this.pwd.replace(/[a-z]/gi, '') === '') {
                return false;
            }
            if (this.pwd.replace(/[0-9]/gi, '') === '') {
                return false;
            }
            return true;
        }
        return false;
    }

}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ActivateService} from './activate.service';
import {ActObj} from './act-obj';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit, OnDestroy {

    loading = false;
    errorMessage = '';
    token = '';
    private sub: any;
    private act = new ActObj();

    constructor(private route: ActivatedRoute, private router: Router,
                private activateSer: ActivateService) {
    }

    ngOnInit(): void {
        // check if JOB exists if not send a request.
        this.sub = this.route.params.subscribe(params => {
            this.token = params['id'];
            if (this.token !== '') {
                this.act.token = this.token;
                this.activateUser();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    activateUser(): void {
        this.loading = false;
        this.activateSer.activateUser(this.act)
            .subscribe(returnObj => {
                    if (returnObj.message === 'OK') {
                        this.router.navigate(['/login']);
                    } else {
                        this.errorMessage = 'Sorry! Something went wrong!';
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! Something went wrong!';
                }, () => {
                    this.loading = false;
                });
    }

}
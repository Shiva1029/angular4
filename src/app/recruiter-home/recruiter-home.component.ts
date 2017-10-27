import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// import {zips} from './zips';

import {RecruiterHomeService} from './recruiter-home.service';

@Component({
    selector: 'app-recruiter-home',
    templateUrl: './recruiter-home.component.html',
    styleUrls: ['./recruiter-home.component.scss']
})
export class RecruiterHomeComponent implements OnInit {

    loading = false;
    title = '';
    description = '';
    zip = '';

    constructor(private router: Router, private recruiterHomeSer: RecruiterHomeService) {
    }

    ngOnInit() {
    }

    postJob(): void {
    }

}

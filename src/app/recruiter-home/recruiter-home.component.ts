import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {RecruiterHomeService} from './recruiter-home.service';

@Component({
    selector: 'app-recruiter-home',
    templateUrl: './recruiter-home.component.html',
    styleUrls: ['./recruiter-home.component.scss']
})
export class RecruiterHomeComponent implements OnInit {

    constructor(private router: Router, private recruiterHomeSer: RecruiterHomeService) {
    }

    ngOnInit() {
    }

}

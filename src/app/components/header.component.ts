import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'header',
    templateUrl: 'templates/header.html',
    styleUrls: ['style/header.css']
})
export class header {
    headerType: String
    constructor(elm: ElementRef) {
        this.headerType = elm.nativeElement.getAttribute('headerType');
    }
}

import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    headerType: String
    constructor(elm: ElementRef) {
        this.headerType = elm.nativeElement.getAttribute('headerType');
    }

  ngOnInit() {
  }

}

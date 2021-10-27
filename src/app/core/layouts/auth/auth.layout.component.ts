import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth.layout',
    templateUrl: './auth.layout.component.html',
    styleUrls: ['./auth.layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#3f51b5';
    }

}

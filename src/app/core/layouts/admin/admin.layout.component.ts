import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
    selector: 'app-admin.layout',
    templateUrl: './admin.layout.component.html',
    styleUrls: ['./admin.layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {

    public companies: MenuItem[] = [
        { url: '/schedule', name: 'Schedule', icon: 'ballot', id: 'schedule' },
    ];

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
    }

}

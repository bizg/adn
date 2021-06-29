import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input() items: MenuItem[];

    constructor() {
        // This is intentional
    }

    ngOnInit() {
        // This is intentional
    }

}

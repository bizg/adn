import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import { TrmService } from '@core/services/trm.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    public trm: string;
    @Input() items: MenuItem[];

    constructor(private trmService: TrmService ) { }

    ngOnInit() {
        this.trmService.obtnerTRM().then(data => {
            this.trm = data.valor;
            localStorage.setItem('trm', this.trm);
        });
    }

}

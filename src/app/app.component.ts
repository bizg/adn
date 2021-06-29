import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app-base';
    public companies: MenuItem[] = [
        { url: '/home', name: 'home', icon: 'home', id: 'home' },
        { url: '/schedule', name: 'Schedule', icon: 'ballot', id: 'schedule' },
    ];
}

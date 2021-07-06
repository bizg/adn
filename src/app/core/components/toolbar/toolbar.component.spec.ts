import { HttpClient, HttpClientModule, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { HttpService } from '@core/services/http.service';
import { TrmService } from '@core/services/trm.service';
import { SELECTORS } from '@shared/util/selects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                MatToolbarModule,
                MatIconModule,
                MatSidenavModule,
                MatMenuModule,
                MatButtonModule,
                MatDividerModule,
                MatListModule,
                FlexLayoutModule
            ],
            providers: [
                { provide: HttpClient, deps: [HttpHandler] },
                { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }) },
                TrmService,
                HttpService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        component.items = [
            { url: '/schedule', name: 'Schedule', icon: 'ballot', id: 'schedule' },
        ];
        fixture.detectChanges();
    });

    it('Validar la existencia de los elementos', fakeAsync(() => {
        const linkSchedule = SELECTORS.NAVBAR.linkSchedule();
        tick(1000);
        fixture.detectChanges();

        expect(linkSchedule?.tagName).toEqual('A');
        expect(component).toBeTruthy();
    }));
});

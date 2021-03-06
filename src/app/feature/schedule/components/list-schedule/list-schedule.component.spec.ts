import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ListScheduleComponent } from './list-schedule.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleService } from '../../shared/service/schedule.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SELECTORS } from '@shared/util/selects';
import { ScheduleMockService } from '@schedule/shared/data/schedule-mock.service';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '@shared/service/alert.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TrmService } from '@core/services/trm.service';
import { FilterPipe } from '@schedule/shared/pipe/filter/filter.pipe';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';

describe('ListScheduleComponent', () => {
    let component: ListScheduleComponent;
    let fixture: ComponentFixture<ListScheduleComponent>;
    const datePipe = new DatePipe('en-US');
    const currentPipe = new CurrencyPipe('en-US');
    let scheduleService: ScheduleService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListScheduleComponent, FilterPipe, TrackByPipe],
            imports: [
                CommonModule,
                HttpClientModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatDialogModule,
                HttpClientTestingModule,
                MatTableModule,
                MatPaginatorModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatIconModule,
                FlexLayoutModule,
                MatDialogModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSelectModule,
                MatIconModule
            ],
            providers: [{
                provide: ScheduleService,
                useValue: {
                    get: () => of(new ScheduleMockService().getSchedule()),
                    delete: () => of([]),
                },
            },
                HttpService,
                AlertService,
                DatePipe,
                CurrencyPipe,
                TrmService,
                FilterPipe,
                TrackByPipe
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListScheduleComponent);
        component = fixture.componentInstance;
        scheduleService = TestBed.inject(ScheduleService);
        const { schedule } = new ScheduleMockService().getSchedule();
        spyOn(scheduleService, 'get').and.returnValue(
            of(schedule)
        );
        fixture.detectChanges();
    });

    it('Validar la existencia de los elementos', () => {
        const table = SELECTORS.SCHEDULE.LIST.table();
        fixture.detectChanges();

        expect(table?.tagName).toEqual('TABLE');
    });

    it('Obtener el listado de agendamientos cuando se inicia el componente', fakeAsync(() => {
        let subject: HTMLElement;
        let name: HTMLElement;
        let date: HTMLElement;
        let startHour: HTMLElement;
        let endHour: HTMLElement;
        let value: HTMLElement;
        let btnEdit: HTMLElement;
        let btnDelete: HTMLElement;
        const index = 0;
        const { schedule } = new ScheduleMockService().getSchedule();
        component.doGet();
        tick(1000);

        fixture.detectChanges();
        subject = SELECTORS.SCHEDULE.LIST.tableItemSubject(index);
        name = SELECTORS.SCHEDULE.LIST.tableItemName(index);
        date = SELECTORS.SCHEDULE.LIST.tableItemDate(index);
        startHour = SELECTORS.SCHEDULE.LIST.tableItemStartHour(index);
        endHour = SELECTORS.SCHEDULE.LIST.tableItemEndHour(index);
        value = SELECTORS.SCHEDULE.LIST.tableItemValue(index);
        btnEdit = SELECTORS.SCHEDULE.LIST.tableItemButtonEdit(index);
        btnDelete = SELECTORS.SCHEDULE.LIST.tableItemButtonDelete(index);

        expect(subject?.textContent.trim()).toEqual(schedule[index].subject);
        expect(name?.textContent.trim()).toEqual(schedule[index].name);
        expect(date?.textContent.trim()).toEqual(datePipe.transform(schedule[index].date, 'M/d/YY'));
        expect(startHour?.textContent.trim()).toEqual(schedule[index].startHour);
        expect(endHour?.textContent.trim()).toEqual(schedule[index].endHour);
        expect(value?.textContent.trim()).toEqual(currentPipe.transform(schedule[index].value));
        expect(btnEdit?.tagName).toEqual('A');
        expect(btnDelete?.tagName).toEqual('A');

    }));

    it('Eliminar una cita del listado', () => {
        const index = 0;
        const { schedule } = new ScheduleMockService().getSchedule();
        fixture.detectChanges();

        expect(component.doDelete(schedule[index])).toBeTrue();
    });

});

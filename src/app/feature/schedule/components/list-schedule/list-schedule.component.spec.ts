import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
// import { of } from 'rxjs';

import { ListScheduleComponent } from './list-schedule.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleService } from '../../shared/service/schedule.service';
// import { Schedule } from '../../shared/model/schedule';
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

fdescribe('ListScheduleComponent', () => {
    let component: ListScheduleComponent;
    let fixture: ComponentFixture<ListScheduleComponent>;
    let datePipe = new DatePipe('en-US');
    let currentPipe = new CurrencyPipe('en-US');
    // let scheduleService: ScheduleService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListScheduleComponent],
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
            ],
            providers: [{
                provide: ScheduleService,
                useValue: {
                    get: () => of([]),
                    delete: () => of([]),
                },
            },
                HttpService,
                AlertService,
                DatePipe,
                CurrencyPipe
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListScheduleComponent);
        component = fixture.componentInstance;
        // scheduleService = TestBed.inject(ScheduleService);
        fixture.detectChanges();
    });

    it('Validar la existencia de los elementos', () => {
        const table = SELECTORS.SCHEDULE.LIST.table();
        fixture.detectChanges();

        expect(table?.tagName).toEqual('TABLE');
    })

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
        let btnDelete: HTMLElement;
        const index = 0;
        const { schedule } = new ScheduleMockService().getSchedule();
        fixture.detectChanges();

        btnDelete = SELECTORS.SCHEDULE.LIST.tableItemButtonDelete(index);
        btnDelete.click();

        expect(component.doDelete(schedule[index])).toBe(true);
    });

});

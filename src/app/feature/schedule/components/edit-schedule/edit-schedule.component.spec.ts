import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditScheduleComponent } from './edit-schedule.component';
import { CommonModule, DatePipe, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SELECTORS } from '@shared/util/selects';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { MockLocationStrategy } from '@angular/common/testing';
import { ScheduleMockService } from '@schedule/shared/data/schedule-mock.service';
import { ScheduleService } from '../../shared/service/schedule.service';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { TrmService } from '@core/services/trm.service';

describe('EditScheduleComponent', () => {
    let component: EditScheduleComponent;
    let fixture: ComponentFixture<EditScheduleComponent>;
    let scheduleService: ScheduleService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EditScheduleComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                ReactiveFormsModule,
                FormsModule,
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
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: []
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        date: '2021-06-01T10:00:00.000Z',
                        endHour: '12:00',
                        id: '202164104656',
                        name: 'Pruebas unitarias name',
                        startHour: '10:00',
                        subject: 'Pruebas unitarias',
                        value: '374850',
                    }
                },
                { provide: LocationStrategy, useClass: MockLocationStrategy },
                ScheduleService,
                HttpService,
                AlertService,
                DatePipe,
                TrmService
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditScheduleComponent);
        component = fixture.componentInstance;
        scheduleService = TestBed.inject(ScheduleService);

        const { schedule } = new ScheduleMockService().getSchedule();
        localStorage.setItem('listSchedule', JSON.stringify(schedule));

        spyOn(scheduleService, 'edit').and.returnValue(
            of(true)
        );
        fixture.detectChanges();
    });

    it('Validar la existencia de los elementos', fakeAsync(() => {
        const inputSubject = SELECTORS.SCHEDULE.UPDATE.inputSubject();
        const inputName = SELECTORS.SCHEDULE.UPDATE.inputName();
        const inputDate = SELECTORS.SCHEDULE.UPDATE.inputDate();
        const inputStartHour = SELECTORS.SCHEDULE.UPDATE.inputStartHour();
        const inputEndHour = SELECTORS.SCHEDULE.UPDATE.inputEndHour();
        const btnSave = SELECTORS.SCHEDULE.UPDATE.buttonSave();
        const btnClose = SELECTORS.SCHEDULE.UPDATE.buttonCloseModal();

        tick(2000);
        fixture.detectChanges();

        expect(inputSubject?.tagName).toEqual('INPUT');
        expect(inputName?.tagName).toEqual('INPUT');
        expect(inputDate?.tagName).toEqual('INPUT');
        expect(inputStartHour?.tagName).toEqual('MAT-SELECT');
        expect(inputEndHour?.tagName).toEqual('MAT-SELECT');
        expect(btnSave?.tagName).toEqual('BUTTON');
        expect(btnClose?.tagName).toEqual('A');

    }));

    it('Formulario tiene que ser valido al ingresar', () => {
        expect(component.scheduleForm.valid).toBe(true);
    });

    it('Formulario es invalido cuando se guarda en fecha y hora que ya existen', () => {
        expect(component.scheduleForm.valid).toBe(true);

        component.scheduleForm.controls.subject.setValue('Pruebas unitaria subject');
        component.scheduleForm.controls.name.setValue('Pruebas unitaria name');
        component.scheduleForm.controls.date.setValue('2021-06-30T05:00:00.000Z');
        component.scheduleForm.controls.startHour.setValue('7:00');
        component.scheduleForm.controls.endHour.setValue('10:00');

        expect(component.scheduleForm.valid).toBe(true);
        expect(component.save()).toBe(false);
    });

    it('Actualizar un agendamiento', () => {
        expect(component.scheduleForm.valid).toBe(true);

        component.scheduleForm.controls.subject.setValue('Pruebas unitaria subject');
        component.scheduleForm.controls.name.setValue('Pruebas unitaria name');
        component.scheduleForm.controls.date.setValue('2021-08-05T05:00:00.000Z');
        component.scheduleForm.controls.startHour.setValue('7:00');
        component.scheduleForm.controls.endHour.setValue('10:00');

        component.save();
        expect(component.scheduleForm.valid).toBe(true);
    });
});

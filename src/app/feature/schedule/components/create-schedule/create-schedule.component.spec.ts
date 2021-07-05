import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { CreateScheduleComponent } from './create-schedule.component';
import { CommonModule, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleService } from '../../shared/service/schedule.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SELECTORS } from '@shared/util/selects';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
// import { ScheduleMockService } from '@schedule/shared/data/schedule-mock.service';

describe('CreateScheduleComponent', () => {
	let component: CreateScheduleComponent;
	let fixture: ComponentFixture<CreateScheduleComponent>;
	let scheduleService: ScheduleService;
	// const { schedule } = new ScheduleMockService().getSchedule();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreateScheduleComponent],
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
			providers: [{
				provide: MatDialogRef,
				useValue: {}
			  },
			  { provide: LocationStrategy, useClass: MockLocationStrategy },
			  ScheduleService,
			  HttpService,
			  AlertService
			],
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateScheduleComponent);
		component = fixture.componentInstance;
		scheduleService = TestBed.inject(ScheduleService);

		const { schedule } = new ScheduleMockService().getSchedule();
		localStorage.setItem('listSchedule', JSON.stringify(schedule));

		spyOn(scheduleService, 'create').and.returnValue(
			of(true)
		);
		fixture.detectChanges();
	});

	it('Validar la existencia de los elementos',fakeAsync( () => {
		const inputSubject = SELECTORS.SCHEDULE.CREATE.inputSubject();
		const inputName = SELECTORS.SCHEDULE.CREATE.inputName();
		const inputDate = SELECTORS.SCHEDULE.CREATE.inputDate();
		const inputStartHour = SELECTORS.SCHEDULE.CREATE.inputStartHour();
		const inputEndHour = SELECTORS.SCHEDULE.CREATE.inputEndHour();
		const btnSave = SELECTORS.SCHEDULE.CREATE.buttonSave();
		const btnClose = SELECTORS.SCHEDULE.CREATE.buttonCloseModal();


		tick(2000);
		fixture.detectChanges();
		

		expect(inputSubject?.tagName).toEqual('INPUT');
		expect(inputName?.tagName).toEqual('INPUT');
		expect(inputDate?.tagName).toEqual('INPUT');
		expect(inputStartHour?.tagName).toEqual('MAT-SELECT');
		expect(inputEndHour?.tagName).toEqual('MAT-SELECT');
		expect(btnSave?.tagName).toEqual('BUTTON');
		expect(btnClose?.tagName).toEqual('BUTTON');

		expect(component).toBeTruthy();
	}));

	it('Formulario es invalido cuando esta vacio', () => {
		expect(component.scheduleForm.valid).toBe(false);
	});

	it('Formulario es invalido cuando se guarda en fecha y hora que ya existen', () => {
		expect(component.scheduleForm.valid).toBe(false);

		component.scheduleForm.controls.subject.setValue('Pruebas unitaria subject');
		component.scheduleForm.controls.name.setValue('Pruebas unitaria name');
		component.scheduleForm.controls.date.setValue('2021-06-30T05:00:00.000Z');
		component.scheduleForm.controls.startHour.setValue('7:00');
		component.scheduleForm.controls.endHour.setValue('10:00');

		expect(component.scheduleForm.valid).toBe(true);
		expect(component.save()).toBeFalsy();
	})

	it('Crear un agendamiento', () => {
		expect(component.scheduleForm.valid).toBe(false);

		component.scheduleForm.controls.subject.setValue('Pruebas unitaria subject');
		component.scheduleForm.controls.name.setValue('Pruebas unitaria name');
		component.scheduleForm.controls.date.setValue('2021-08-05T05:00:00.000Z');
		component.scheduleForm.controls.startHour.setValue('7:00');
		component.scheduleForm.controls.endHour.setValue('10:00');

		component.save();
		expect(component.scheduleForm.valid).toBe(true);
	});
});

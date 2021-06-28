import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../shared/service/schedule.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

@Component({
	selector: 'app-crear-producto',
	templateUrl: './create-schedule.component.html',
	styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
	scheduleForm: FormGroup;
	constructor(
		protected scheduleService: ScheduleService,
		private matDialog: MatDialogRef<CreateScheduleComponent>
	) { }

	ngOnInit() {
		this.buildFormSchedule();
	}

	save() {
		let form = this.scheduleForm.value;
			form.id = this.getId();
			form.date = form.date;
			form.value = environment.valueSchedule;
		this.scheduleService.create(form).subscribe(() => {
			this.closeModal();
		});
	}

	private buildFormSchedule() {
		this.scheduleForm = new FormGroup({
			subject: new FormControl('', [Validators.required,
											Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
											Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
			name: new FormControl('', [Validators.required,
										Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
										Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
			date: new FormControl('', [Validators.required]),
			start_hour: new FormControl('', [Validators.required]),
			end_hour: new FormControl('', [Validators.required]),
		});
	}

	private getId() {
		let date = new Date();
		let days = `${date.getFullYear()}${date.getMonth()}${date.getDay()}`;
		let time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
		return `${days}${time}`;
	}

	public closeModal(){
		this.matDialog.close();
	}

}

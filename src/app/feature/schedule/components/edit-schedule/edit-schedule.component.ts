import { Component, Inject, OnInit } from '@angular/core';
import { ScheduleService } from '../../shared/service/schedule.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from '../../shared/model/schedule';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

@Component({
	selector: 'app-borrar-producto',
	templateUrl: './edit-schedule.component.html',
	styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {


	scheduleForm: FormGroup;
	constructor(
		protected scheduleService: ScheduleService,
		private matDialog: MatDialogRef<EditScheduleComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Schedule
	) { }

	ngOnInit() {
		this.buildFormSchedule();
	}

	save() {
		let form = this.scheduleForm.value;
		form.id = this.data.id;
		form.value = environment.valueSchedule;
		this.scheduleService.edit(form).subscribe(() => {
			this.closeModal();
		});
	}

	private buildFormSchedule() {
		this.scheduleForm = new FormGroup({
			subject: new FormControl(this.data.subject, [Validators.required,
											Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
											Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
			name: new FormControl(this.data.name, [Validators.required,
										Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
										Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
			date: new FormControl(this.data.date, [Validators.required]),
			start_hour: new FormControl(this.data.start_hour, [Validators.required]),
			end_hour: new FormControl(this.data.end_hour, [Validators.required]),
		});
	}

	public closeModal() {
		this.matDialog.close();
	}

}

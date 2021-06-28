import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ScheduleService } from '../../shared/service/schedule.service';
import { Schedule } from '../../shared/model/schedule';
import {MatDialog} from '@angular/material/dialog';
import { CreateScheduleComponent } from '../create-schedule/create-schedule.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';

@Component({
	selector: 'app-list-schedule',
	templateUrl: './list-schedule.component.html',
	styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {
	public listSchedule: Observable<Schedule[]>;
	public dataSource: Schedule[];
	public displayedColumns: string[] = ['id',
		'subject',
		'name',
		'date',
		'start_hour',
		'end_hour',
		'value',
		'options'
	];

	constructor(
		protected scheduleService: ScheduleService,
		public dialog: MatDialog,
	) { }

	ngOnInit() {
		this.doGet();
	}

	doGet() {
		this.listSchedule = this.scheduleService.get();
	}

	doDelete(schedule: Schedule) {
		this.scheduleService.delete(schedule).subscribe(() => {
			this.doGet();
		});
	}

	openDialogCreate(): void {
		const dialogRef = this.dialog.open(CreateScheduleComponent, {
			width: '60%',
			height: '60vh'
		});

		dialogRef.afterClosed().subscribe(() => {
			this.doGet();
		});
	}

	openDialogEdit(schedule: Schedule): void {
		const dialogRef = this.dialog.open(EditScheduleComponent, {
			width: '60%',
			height: '60vh',
			data: schedule
		});

		dialogRef.afterClosed().subscribe(() => {
			this.doGet();
		});
	}

}

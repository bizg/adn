import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../shared/service/schedule.service';
import { Schedule } from '../../shared/model/schedule';
import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleComponent } from '../create-schedule/create-schedule.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import { AlertService } from '@shared/service/alert.service';

@Component({
    selector: 'app-list-schedule',
    templateUrl: './list-schedule.component.html',
    styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {
    public listSchedule: Schedule[];
    public dataSource: Schedule[];
    public displayedColumns: string[] = ['id',
        'subject',
        'name',
        'date',
        'startHour',
        'endHour',
        'value',
        'options'
    ];

    constructor(
        protected scheduleService: ScheduleService,
        public dialog: MatDialog,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.doGet();
    }

    doGet() {
        this.scheduleService.get().subscribe(data => {
            this.listSchedule = data;
            localStorage.removeItem('listSchedule');
            localStorage.setItem('listSchedule', JSON.stringify(data));
        });
    }

    doDelete(schedule: Schedule) {
        this.scheduleService.delete(schedule).subscribe(() => {
            this.doGet();
            this.alertService.AlertaExito('Se ha realizado la eliminación del agendamiento exitosamente');
            return true;
        });
        return true;
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

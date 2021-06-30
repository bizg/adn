import { Component, Inject, OnInit } from '@angular/core';
import { ScheduleService } from '../../shared/service/schedule.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from '../../shared/model/schedule';
import { AlertService } from '@shared/service/alert.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

@Component({
    selector: 'app-borrar-producto',
    templateUrl: './edit-schedule.component.html',
    styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {

    horario: string[] = [];
    scheduleForm: FormGroup;
    constructor(
        protected scheduleService: ScheduleService,
        private matDialog: MatDialogRef<EditScheduleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Schedule,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.obtenerRangoDeDisponibilidad();
        this.buildFormSchedule();
    }

    save() {
        const form = this.scheduleForm.value;
        if (!this.scheduleForm.valid) { return; }
        form.id = this.data.id;
        form.value = this.scheduleService.calcularPrecioCita(form);
        if (this.scheduleService.validarDisponibilidadAgenda(form).length > 0) {
            this.alertService.AlertaError('Ya hay citas agendas en la hora seleccionada');
            return;
        }
        this.scheduleService.edit(form).subscribe(() => {
            this.alertService.AlertaExito('Se ha realizado la actualización del agendamiento exitosamente');
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
            startHour: new FormControl(this.data.startHour, [Validators.required]),
            endHour: new FormControl(this.data.endHour, [Validators.required]),
        });
    }

    private obtenerRangoDeDisponibilidad() {
        this.horario = this.scheduleService.obtenerRangoDeDisponibilidad();
    }

    public closeModal() {
        this.matDialog.close();
    }

}

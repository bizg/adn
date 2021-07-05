import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../shared/service/schedule.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/service/alert.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 50;

@Component({
    selector: 'app-crear-producto',
    templateUrl: './create-schedule.component.html',
    styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
    horario: string[] = [];
    scheduleForm: FormGroup;
    constructor(
        protected scheduleService: ScheduleService,
        private matDialog: MatDialogRef<CreateScheduleComponent>,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.obtenerRangoDeDisponibilidad();
        this.buildFormSchedule();
    }

    save() {
        const form = this.scheduleForm.value;
        if (!this.scheduleForm.valid) { return; }
        form.id = this.getId();
        form.value = this.scheduleService.calcularPrecioCita(form);
        if (this.scheduleService.validarDisponibilidadAgenda(form).length > 0) {
            this.alertService.AlertaError('Ya hay citas agendas en la hora seleccionada');
            return;
        }
        this.scheduleService.create(form).subscribe(() => {
            this.alertService.AlertaExito('Se ha realizado la creación del agendamiento exitosamente');
            this.closeModal();
            return true;
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
            startHour: new FormControl('', [Validators.required]),
            endHour: new FormControl('', [Validators.required]),
        });
    }

    obtenerRangoDeDisponibilidad() {
        this.horario = this.scheduleService.obtenerRangoDeDisponibilidad();
    }

    private getId() {
        const date = new Date();
        const days = `${date.getFullYear()}${date.getMonth()}${date.getDay()}`;
        const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        return `${days}${time}`;
    }

    public closeModal() {
        this.matDialog?.close();
    }

}

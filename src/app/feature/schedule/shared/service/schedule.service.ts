import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { range } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../model/schedule';

const HORA_INICIO = 7;
const HORA_FIN_RANGO = 11;

@Injectable()
export class ScheduleService {

    constructor(protected http: HttpService) { }

    public get() {
        return this.http.doGet<Schedule[]>(`${environment.endpoint}/schedule`, this.http.optsName('Get schedule'));
    }

    public create(schedule: Schedule) {
        return this.http.doPost<Schedule, boolean>(`${environment.endpoint}/schedule`, schedule,
            this.http.optsName('Create schedule'));
    }

    public edit(schedule: Schedule) {
        return this.http.doPut<Schedule, boolean>(`${environment.endpoint}/schedule/${schedule.id}`, schedule,
            this.http.optsName('Edit schedule'));
    }

    public delete(schedule: Schedule) {
        return this.http.doDelete<boolean>(`${environment.endpoint}/schedule/${schedule.id}`,
            this.http.optsName('Delete schedule'));
    }

    public validarDisponibilidadAgenda(form) {
        const data = JSON.parse(localStorage.getItem('listSchedule'))
            .filter(e => {
                const date = new Date(e.date);
                const date2 = new Date(form.date);
                return `${date.getFullYear()}${date.getMonth()}${date.getDay()}` === `${date2.getFullYear()}${date2.getMonth()}${date2.getDay()}`;
            })
            .filter(e => (e.startHour === form.startHour));
        return data;
    }

    public calcularPrecioCita(form) {
        const horaInicio = form.startHour.split(':')[0];
        const tiempo = form.endHour.split(':')[0] - horaInicio;
        let valor = (environment.valueSchedule * tiempo) * parseFloat(localStorage.getItem('trm'));
        if (horaInicio < 10) { valor = valor - (valor * 0.15); }
        if (horaInicio > 10 && horaInicio < 12) { valor = valor - (valor * 0.05); }

        return Math.round(valor);
    }

    public obtenerRangoDeDisponibilidad() {
        let horario: string[] = [];
        range(HORA_INICIO, HORA_FIN_RANGO).subscribe(numero => {
            horario = [...horario, `${numero}:00`];
        });
        return horario;
    }
}

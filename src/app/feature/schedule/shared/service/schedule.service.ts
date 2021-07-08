import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { TrmService } from '@core/services/trm.service';
import { range } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../model/schedule';

const HORA_INICIO:number = 7;
const HORA_FIN_RANGO:number = 11;
const HORA_FIN_DESCUENTO_QUINCE_PORCIENTO:number = 10;
const HORA_FIN_DESCUENTO_CINCO_PORCIENTO:number = 12;
const VALOR_HORA_DESCUENTO_QUINCE:number = 0.15;
const VALOR_HORA_DESCUENTO_CINCO:number = 0.05;

@Injectable()
export class ScheduleService {

    constructor(
        protected http: HttpService,
        private serviceTrm: TrmService
    ) { }

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
        return JSON.parse(localStorage.getItem('listSchedule'))
            .filter(e => {
                const date = new Date(e.date);
                const date2 = new Date(form.date);
                return `${date.getFullYear()}${date.getMonth()}${date.getDay()}` === `${date2.getFullYear()}${date2.getMonth()}${date2.getDay()}`;
            })
            .filter(e => (e.startHour === form.startHour));
    }

    public calcularPrecioCita(form) {
        const horaInicio = form.startHour.split(':')[0];
        const tiempo = form.endHour.split(':')[0] - horaInicio;
        let trm:number = 0;
        this.serviceTrm.obtnerTRM().then(data => {
            trm = parseFloat(data.valor);
        });
        let valor = (environment.valueSchedule * tiempo) * trm;
        if (horaInicio < HORA_FIN_DESCUENTO_QUINCE_PORCIENTO) { valor = valor - (valor * VALOR_HORA_DESCUENTO_QUINCE); }
        if (horaInicio >= HORA_FIN_DESCUENTO_QUINCE_PORCIENTO && horaInicio <= HORA_FIN_DESCUENTO_CINCO_PORCIENTO) { 
            valor = valor - (valor * VALOR_HORA_DESCUENTO_CINCO); 
        }

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

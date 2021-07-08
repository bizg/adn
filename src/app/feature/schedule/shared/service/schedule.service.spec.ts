import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ScheduleService } from './schedule.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Schedule } from '../model/schedule';
import { HttpResponse } from '@angular/common/http';
import { TrmService } from '@core/services/trm.service';
import { ScheduleMockService } from '../data/schedule-mock.service';

fdescribe('ScheduleService', () => {
    let httpMock: HttpTestingController;
    let service: ScheduleService;
    let serviceTrm: TrmService;
    const apiEndpointSchedule = `${environment.endpoint}/schedule`;
    const VALOR_HORA_DESCUENTO_QUINCE:number = 0.15;
    const VALOR_HORA_DESCUENTO_CINCO:number = 0.05;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScheduleService, TrmService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(ScheduleService);
        serviceTrm = TestBed.inject(TrmService);
    });

    it('deberia listar agendamientos', () => {
        const dummySchedule = new ScheduleMockService().getSchedule().schedule;
        service.get().subscribe(schedule => {
            expect(schedule.length).toBe(4);
            expect(schedule).toEqual(dummySchedule);
        });
        const req = httpMock.expectOne(apiEndpointSchedule);
        expect(req.request.method).toBe('GET');
        req.flush(dummySchedule);
    });

    it('deberia crear un agendamiento', () => {
        const dummySchedule = new ScheduleMockService().createSchedule();
        service.create(dummySchedule).subscribe((respuesta) => {
            expect(respuesta).toEqual(true);
        });
        const req = httpMock.expectOne(apiEndpointSchedule);
        expect(req.request.method).toBe('POST');
        req.event(new HttpResponse<boolean>({ body: true }));
    });

    it('deberia actualizar un agendamiento', () => {
        const dummySchedule = new ScheduleMockService().updateSchedule();
        service.edit(dummySchedule).subscribe((respuesta) => {
            expect(respuesta).toEqual(true);
        });
        const req = httpMock.expectOne(`${apiEndpointSchedule}/${dummySchedule.id}`);
        expect(req.request.method).toBe('PUT');
        req.event(new HttpResponse<boolean>({ body: true }));
    });

    it('deberia eliminar un agendamiento', () => {
        const dummySchedule = new Schedule(
            '2021542128342',
            'cita de prueba 23421',
            'nombre prueba 2',
            '2021-06-24T05:00:00.000Z',
            '15:00',
            '16:00',
            '40'
        );
        service.delete(dummySchedule).subscribe((respuesta) => {
            expect(respuesta).toEqual(true);
        });
        const req = httpMock.expectOne(`${apiEndpointSchedule}/${dummySchedule.id}`);
        expect(req.request.method).toBe('DELETE');
        req.event(new HttpResponse<boolean>({ body: true }));
    });

    it('deberia de calcular el precio de la cita con descuento del 15%', () => {
        let valorCitaMock: number = 0;
        let trm: number = 0;
        serviceTrm.obtnerTRM().then(data => {
            trm = parseFloat(data.valor);
        });

        valorCitaMock = (environment.valueSchedule * 2) * trm;
        valorCitaMock = valorCitaMock - (valorCitaMock * VALOR_HORA_DESCUENTO_QUINCE);
        const dummySchedule = new Schedule(
            '2021542128342',
            'cita de prueba 23421',
            'nombre prueba 2',
            '2021-06-24T05:00:00.000Z',
            '9:00',
            '11:00',
            '40'
        );

        const valorCita = service.calcularPrecioCita(dummySchedule);
        expect(valorCita).toBe(Math.round(valorCitaMock));
        
    });

    it('deberia de calcular el precio de la cita con descuento del 5%', () => {
        let valorCitaMock: number = 0;
        let trm: number = 0;
        serviceTrm.obtnerTRM().then(data => {
            trm = parseFloat(data.valor);
        });

        valorCitaMock = (environment.valueSchedule * 2) * trm;
        valorCitaMock = valorCitaMock - (valorCitaMock * VALOR_HORA_DESCUENTO_CINCO);
        const dummySchedule = new Schedule(
            '2021542128342',
            'cita de prueba 23421',
            'nombre prueba 2',
            '2021-06-24T05:00:00.000Z',
            '10:00',
            '12:00',
            '40'
        );

        const valorCita = service.calcularPrecioCita(dummySchedule);
        expect(valorCita).toBe(Math.round(valorCitaMock)); 
    });

    it('Deberia de obtener el rango de disponibilidad', () => {
        const rangoDisponibilidadMock = new ScheduleMockService().obtenerRangoDeDisponibilidad();
        const rangoDispobilidad = service.obtenerRangoDeDisponibilidad();

        expect(rangoDispobilidad.length).toBe(rangoDisponibilidadMock.length);
    });
});

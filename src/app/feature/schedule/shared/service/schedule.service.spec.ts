import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ScheduleService } from './schedule.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Schedule } from '../model/schedule';
import { HttpResponse } from '@angular/common/http';

describe('ScheduleService', () => {
    let httpMock: HttpTestingController;
    let service: ScheduleService;
    const apiEndpointSchedule = `${environment.endpoint}/schedule`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScheduleService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(ScheduleService);
    });

    it('deberia listar agendamientos', () => {
        const dummySchedule = [
            new Schedule(
                '2021542128342',
                'cita de prueba 23421',
                'nombre prueba 2',
                '2021-06-24T05:00:00.000Z',
                '15:00',
                '16:00',
                '40'
            ),
            new Schedule(
                '20215421283455',
                'cita de prueba 32423',
                'nombre prueba 243223',
                '2021-06-24T05:00:00.000Z',
                '15:00',
                '16:00',
                '40'
            )
        ];
        service.get().subscribe(schedule => {
            expect(schedule.length).toBe(2);
            expect(schedule).toEqual(dummySchedule);
        });
        const req = httpMock.expectOne(apiEndpointSchedule);
        expect(req.request.method).toBe('GET');
        req.flush(dummySchedule);
    });

    it('deberia crear un agendamiento', () => {
        const dummySchedule = new Schedule(
            '2021542128342',
            'cita de prueba 23421',
            'nombre prueba 2',
            '2021-06-24T05:00:00.000Z',
            '15:00',
            '16:00',
            '40'
        );
        service.create(dummySchedule).subscribe((respuesta) => {
            expect(respuesta).toEqual(true);
        });
        const req = httpMock.expectOne(apiEndpointSchedule);
        expect(req.request.method).toBe('POST');
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
});

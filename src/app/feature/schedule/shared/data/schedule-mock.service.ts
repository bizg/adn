import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleMockService {
    getSchedule() {
        return (
            {
                schedule: [
                    {
                        subject: 'prueba',
                        name: 'prueba',
                        date: '2021-06-30T05:00:00.000Z',
                        startHour: '7:00',
                        endHour: '9:00',
                        id: '20215212622',
                        value: '371317'
                    },
                    {
                        subject: 'mike',
                        name: 'mike',
                        date: '2021-07-01T05:00:00.000Z',
                        startHour: '15:00',
                        endHour: '16:00',
                        id: '202152122256',
                        value: '185659'
                    },
                    {
                        subject: 'fgdfgdfg',
                        name: 'gsdfgdsfg',
                        date: '2021-06-29T05:00:00.000Z',
                        startHour: '8:00',
                        endHour: '9:00',
                        id: '202152145724',
                        value: '157810'
                    },
                    {
                        subject: 'Pruebas unitarias',
                        name: 'Pruebas unitarias name',
                        date: '2021-06-01T10:00:00.000Z',
                        startHour: '10:00',
                        endHour: '12:00',
                        id: '2021542128342',
                        value: '374850'
                    }
                ]
            }
        );
    }

    obtenerRangoDeDisponibilidad() {
        return (['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']);
    }

    createSchedule() {
        return ({
            id: '2021542128342',
            subject: 'cita de prueba 23421',
            name: 'nombre prueba 2',
            date: '2021-06-24T05:00:00.000Z',
            startHour: '15:00',
            endHour: '16:00',
            value: '40'
        });
    }

    updateSchedule() {
        return ({
            id: '2021542128342',
            subject: 'cita de prueba actualizar',
            name: 'nombre prueba 2222',
            date: '2021-06-24T05:00:00.000Z',
            startHour: '15:00',
            endHour: '16:00',
            value: '40'
        });
    }

    deleteSchedule() {
        return true;
    }

}

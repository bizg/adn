import { ScheduleMockService } from '@schedule/shared/data/schedule-mock.service';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {

    const schedule = new ScheduleMockService().getSchedule().schedule;
    const pipe = new FilterPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('Deberia no devolver datos si el nombre no existe', () => {
        const itemsFiltrados = pipe.transform(schedule, 'data para no encontrar').length;
        expect(itemsFiltrados).toEqual(0);
    });

    it('Deberia devolver datos cuando encuentre informacion', () => {
        const itemsFiltrados = pipe.transform(schedule, 'filtro').length;
        expect(itemsFiltrados).toEqual(1);
    });

    it('Deberia de devolver multiples registros', () => {
        const itemsFiltrados = pipe.transform(schedule, 'prueba').length;
        expect(itemsFiltrados).toEqual(2);
    });
});

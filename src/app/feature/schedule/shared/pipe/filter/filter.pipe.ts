import { Pipe, PipeTransform } from '@angular/core';
import {
    Schedule
} from '@schedule/shared/model/schedule';

@Pipe({
    name: 'filterData'
})
export class FilterPipe implements PipeTransform {

    transform(items: Schedule[], filtro: string) {
        if (!items || !filtro) {
            return items;
        }
        return items.filter(item => item.name.indexOf(filtro) !== -1);
    }

}

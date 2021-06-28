import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Schedule } from '../model/schedule';


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
}

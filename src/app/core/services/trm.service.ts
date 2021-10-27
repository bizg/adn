import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import TrmApi from 'trm-api';


@Injectable()
export class TrmService {

    constructor(
        protected http: HttpService,
    ) { }

    public obtnerTRM() {
        const trm = new TrmApi();
        return trm.latest();
    }

}

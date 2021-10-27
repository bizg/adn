import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Login } from '@login/shared/model/login';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService) { }

    public login(data: Login) {
        return this.httpService.doPost(`${environment.fakeEnpoint}/login`, data);
    }
}

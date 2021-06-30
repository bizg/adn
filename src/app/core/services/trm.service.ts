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

    //   public consultar() {
    //     return this.http.doGet<Producto[]>(`${environment.endpoint}/tiposFamilia`, this.http.optsName('consultar productos'));
    //   }

    //   public guardar(producto: Producto) {
    //     return this.http.doPost<Producto, boolean>(`${environment.endpoint}/productos`, producto,
    //                                                 this.http.optsName('crear/actualizar productos'));
    //   }

    //   public eliminar(producto: Producto) {
    //     return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${producto.id}`,
    //                                                  this.http.optsName('eliminar productos'));
    //   }
}
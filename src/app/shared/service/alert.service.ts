import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class AlertService {

    constructor() { }

    public AlertaExito(texto: string, titulo?: string) {
        return Swal.fire({
            icon: 'success',
            title: titulo || 'Exíto al realizar la operación',
            text: texto,
            confirmButtonText: 'Cerrar'
        });
    }

    public AlertaError(texto: string, titulo?: string) {
        return Swal.fire({
            icon: 'error',
            title: titulo || 'Oops...',
            text: texto,
            confirmButtonText: 'Cerrar'
        });
    }

}

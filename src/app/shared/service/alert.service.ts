import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class AlertService {

    public mensajeExito(texto: string, titulo?: string) {
        return Swal.fire({
            icon: 'success',
            title: titulo || 'Exíto al realizar la operación',
            text: texto,
            confirmButtonText: 'Cerrar'
        });
    }

    public mensajeError(texto: string, titulo?: string) {
        return Swal.fire({
            icon: 'error',
            title: titulo || 'Oops...',
            text: texto,
            confirmButtonText: 'Cerrar'
        });
    }

}

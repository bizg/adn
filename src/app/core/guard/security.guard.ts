import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
        if(!sessionStorage.getItem('token')) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './shared/service/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    ngOnInit() {
        this.precargarFormulario();
    }

    private precargarFormulario() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    public iniciarSesion() {
        if (!this.loginForm.valid){
            return false;
        }

        this.loginService.login(this.loginForm.value).subscribe((data) => {
            sessionStorage.setItem('token', JSON.stringify(data));
            this.router.navigate(['/schedule']);
        });
    }

}

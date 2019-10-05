import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        // INITIALIZE FORM // receives javascript object with controls, one for each field
        this.loginForm = new FormGroup({
            ctrlEmail: new FormControl('Some string', { validators: [
                Validators.required,
                Validators.email
            ] }),
            // instead of 'some string' can also be null:
            ctrlPassword: new FormControl(null, [
                Validators.required
            ])
        });
    }

    onSubmit() {
        this.authService.login({
            email: this.loginForm.value.ctrlEmail,
            password: this.loginForm.value.ctrlPassword
        });
    }

}

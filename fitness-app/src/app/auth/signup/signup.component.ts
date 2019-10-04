import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    maxDate: Date;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.maxDate = new Date();
        // set age minimum to 18
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    onSubmit(formRef: NgForm) {
        this.authService.registerUser({
            email: formRef.value.email,
            password: formRef.value.password
        });
    }
}

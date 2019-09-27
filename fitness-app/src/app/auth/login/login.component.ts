import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor() {}

    ngOnInit() {
        // INITIALIZE FORM // receives javascript object with controls, one for each field
        this.loginForm = new FormGroup({
            'loginData': new FormGroup({
                'ctrlEmail': new FormControl('Email', [
                    Validators.required,
                    Validators.email
                ]),
                'ctrlPassword': new FormControl('Password', [
                    Validators.required
                ]),
                'ctrlBirthday': new FormControl(null , [
                    Validators.required
                ]),
                'ctrlAgree': new FormControl(null , [
                    Validators.required
                ])
            })
            /*
            ,
            'ctrlGender': new FormControl('male'),
            //'ctrlArrHobbies': new FormArray([]) // array of controls; starts empty or:
            'ctrlArrHobbies': new FormArray([
                new FormControl('Coding'),
                new FormControl('Driving cars'),
                new FormControl('Dancing')
            ])
            */
        });
    }

    onSubmit() {
        console.log( this.loginForm );
    }

    // RESET
    resetForm() {
        this.loginForm.reset(); // object can be passed to clear just some fields
    }
}

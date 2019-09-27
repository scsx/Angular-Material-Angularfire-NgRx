import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    maxDate: Date;

    constructor() {}

    ngOnInit() {
        this.maxDate = new Date();
        // set age minimum to 18
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    onSubmit(formRef: NgForm) {
        console.log(formRef.form.controls);
    }
}

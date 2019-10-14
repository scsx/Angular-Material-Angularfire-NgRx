import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    // loading spinner show/hide
    isLoading = false;
    private isLoadingSub$: Subscription;

    constructor(private authService: AuthService, private uiService: UIService) {}

    ngOnInit() {
        // spinner
        this.isLoadingSub$ = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
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

    ngOnDestroy() {
        if (this.isLoadingSub$) {
            this.isLoadingSub$.unsubscribe();
        }
    }

}

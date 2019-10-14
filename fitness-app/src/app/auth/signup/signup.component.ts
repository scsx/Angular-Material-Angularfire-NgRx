import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

    maxDate: Date;
    isLoading = false;
    private isLoadingSub$: Subscription;

    constructor(private authService: AuthService, private uiService: UIService) {}

    ngOnInit() {
        this.isLoadingSub$ = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
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

    ngOnDestroy() {
        if (this.isLoadingSub$) {
            this.isLoadingSub$.unsubscribe();
        }
    }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IAuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;
    authChange = new Subject<boolean>();
    // assumes true = logged in; is called like this.authChange.next(true/false);

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trService: TrainingService,
        private snackbar: MatSnackBar,
        private uiService: UIService) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trService.cancelSubscriptions(); // manage logout problems, aula 96
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: IAuthData) {
        // show spinner
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // hide spinner (success -> completed)
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            // hide spinner (error -> completed)
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, 3000);
        });
    }

    login(authData: IAuthData) {
        // show spinner
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // hide spinner (success -> completed)
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            // hide spinner (error -> completed)
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    // getUser() because user: IUser is private
    /* getUser() {
        return { ...this.user}; // spread operator to copy User without changing the original
    } */

    isAuth() {
        return this.isAuthenticated;
    }

}

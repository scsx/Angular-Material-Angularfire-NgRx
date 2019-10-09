import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IAuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

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
        private trService: TrainingService) {}

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
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    }

    login(authData: IAuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
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

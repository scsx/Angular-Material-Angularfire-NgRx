import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from './user.model';
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

    registerUser(authData: IAuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.authSuccessfully(true, '/training');
        }).catch(error => {
            console.log(error);
        });
    }

    login(authData: IAuthData) {

        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.authSuccessfully(true, '/training');
        }).catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.trService.cancelSubscriptions(); // manage logout problems, aula 96
        this.isAuthenticated = false;
        this.authSuccessfully(false, '/login');
    }

    // getUser() because user: IUser is private
    /* getUser() {
        return { ...this.user}; // spread operator to copy User without chaning the original
    } */

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully(next: boolean, whereTo: string) {
        this.isAuthenticated = true;
        this.authChange.next(next);
        this.router.navigate([whereTo]);
    }

}

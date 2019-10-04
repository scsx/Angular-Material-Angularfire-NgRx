import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from './user.model';
import { IAuthData } from './auth-data.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: IUser;
    authChange = new Subject<boolean>();
    // assumes true = logged in and is called like this.authChange.next(true/false);

    constructor(private router: Router) {}

    registerUser(authData: IAuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully(true, '/training');
    }

    login(authData: IAuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully(true, '/training');
    }

    logout() {
        this.user = null;
        this.authSuccessfully(false, '/login');
    }

    // getUser() because user: IUser is private
    getUser() {
        // spread operator to copy User without chaning the original
        return { ...this.user};
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully(next: boolean, whereTo: string) {
        this.authChange.next(next);
        this.router.navigate([whereTo]);
    }

}

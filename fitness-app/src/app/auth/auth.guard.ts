import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {}

    // this is not used anymore because of lazy loading and AuthGuard going to app-routing.module
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.authService.isAuth() returns a boolean
        if ( this.authService.isAuth() ) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route) {
        if ( this.authService.isAuth() ) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

}

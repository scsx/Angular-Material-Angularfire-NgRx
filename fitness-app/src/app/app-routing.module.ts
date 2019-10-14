import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TermsComponent } from './terms/terms.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard] } // similar to canActivate
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})

export class AppRoutingModule {}

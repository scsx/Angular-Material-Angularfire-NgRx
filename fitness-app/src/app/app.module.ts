import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
// cpts
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TermsComponent } from './terms/terms.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// evt
import { environment } from '../environments/environment';
// modules
import { AuthModule } from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        TermsComponent,
        HeaderComponent,
        SidenavListComponent
    ],
    imports: [
        HttpClientModule ,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

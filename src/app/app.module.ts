import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecordComponent } from './components/home/record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users-view/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserCardComponent } from './shared/user-card/user-card.component';
import { LoginComponent } from './components/login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { AddRaceComponent } from './shared/add-race/add-race.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RaceCardComponent } from './shared/race-card/race-card.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RecordComponent,
    UsersComponent,
    ProfileComponent,
    UserCardComponent,
    LoginComponent,
    AddRaceComponent,
    RaceCardComponent,
    OverviewComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    OverlayModule,
    MatDialogModule,
    MatSelectModule,
    NgxChartsModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, MatSnackBar, MatDialog, MatDialogModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}

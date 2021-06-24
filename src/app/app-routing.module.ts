import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './components/home/record.component';
import { UsersComponent } from './components/users-view/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';


const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'record', component: RecordComponent },
  { path: 'users', component: UsersComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

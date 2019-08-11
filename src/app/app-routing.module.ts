import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './C.COMPONENT/2.UserManager/login/login.component';
import {RegisterComponent} from './C.COMPONENT/2.UserManager/register/register.component';
import {UpdateInforComponent} from './C.COMPONENT/2.UserManager/update-infor/update-infor.component';
import {ChangePassComponent} from './C.COMPONENT/2.UserManager/change-pass/change-pass.component';
import {DashboardComponent} from './C.COMPONENT/2.UserManager/dashboard/dashboard.component';
import {CreateSongComponent} from './C.COMPONENT/3.SongManager/create-song/create-song.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'home/auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'auth/updateinfor', component: UpdateInforComponent},
  {path: 'auth/changepass', component: ChangePassComponent},
  {path: 'auth/dashboard', component: DashboardComponent},
  {path: 'home/create-song', component: CreateSongComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

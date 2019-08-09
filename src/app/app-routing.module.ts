import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './C.COMPONENT/2.UserManager/login/login.component';
import {RegisterComponent} from './C.COMPONENT/2.UserManager/register/register.component';
import {UpdateInforComponent} from './C.COMPONENT/2.UserManager/update-infor/update-infor.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'home/auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'auth/updateinfor', component: UpdateInforComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './C.COMPONENT/2.UserManager/login/login.component';
import {RegisterComponent} from './C.COMPONENT/2.UserManager/register/register.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'home/auth/login', component: LoginComponent},
  {path: 'home/auth/register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

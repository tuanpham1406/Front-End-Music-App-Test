import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent} from './C.COMPONENT/1.Layout/header/header.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'auth', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

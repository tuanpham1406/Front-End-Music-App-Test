import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './C.COMPONENT/2.UserManager/login/login.component';
import { HeaderComponent } from './C.COMPONENT/1.Layout/header/header.component';
import { UserComponent } from './C.COMPONENT/3.UserAuth/user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './B.SERVICE/1.UserManager/auth/auth-interceptor';
import { RegisterComponent } from './C.COMPONENT/2.UserManager/register/register.component';
import { UpdateInforComponent } from './C.COMPONENT/2.UserManager/update-infor/update-infor.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    RegisterComponent,
    UpdateInforComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

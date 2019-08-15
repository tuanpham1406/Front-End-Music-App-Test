import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './C.COMPONENT/2.UserManager/login/login.component';
import { HeaderComponent } from './C.COMPONENT/1.Layout/header/header.component';
import { UserComponent } from './C.COMPONENT/2.UserManager/UserAuth/user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './B.SERVICE/1.UserManager/auth/auth-interceptor';
import { RegisterComponent } from './C.COMPONENT/2.UserManager/register/register.component';
import { UpdateInforComponent } from './C.COMPONENT/2.UserManager/update-infor/update-infor.component';
import { ChangePassComponent } from './C.COMPONENT/2.UserManager/change-pass/change-pass.component';
import { DashboardComponent } from './C.COMPONENT/2.UserManager/dashboard/dashboard.component';
import { CreateSongComponent } from './C.COMPONENT/3.SongManager/create-song/create-song.component';
import { ListSongComponent } from './C.COMPONENT/3.SongManager/list-song/list-song.component';
import { DetailSongComponent } from './C.COMPONENT/3.SongManager/detail-song/detail-song.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { ContentComponent } from './C.COMPONENT/1.Layout/content/content.component';
import { CaroselComponent } from './C.COMPONENT/1.Layout/content/carosel/carosel.component';
import { PersonalComponent } from './C.COMPONENT/3.SongManager/personal/personal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    RegisterComponent,
    UpdateInforComponent,
    ChangePassComponent,
    DashboardComponent,
    CreateSongComponent,
    ListSongComponent,
    DetailSongComponent,
    ContentComponent,
    CaroselComponent,
    PersonalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

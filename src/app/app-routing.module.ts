import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './C.COMPONENT/2.UserManager/login/login.component';
import {RegisterComponent} from './C.COMPONENT/2.UserManager/register/register.component';
import {UpdateInforComponent} from './C.COMPONENT/2.UserManager/update-infor/update-infor.component';
import {ChangePassComponent} from './C.COMPONENT/2.UserManager/change-pass/change-pass.component';
import {DashboardComponent} from './C.COMPONENT/2.UserManager/dashboard/dashboard.component';
import {ContentComponent} from './C.COMPONENT/1.Layout/content/content.component';
import {PersonalComponent} from './C.COMPONENT/3.SongManager/personal/personal.component';
import {ListSongComponent} from './C.COMPONENT/3.SongManager/list-song/list-song.component';
import {DetailSongComponent} from './C.COMPONENT/3.SongManager/detail-song/detail-song.component';
import {SingerComponent} from './singer/singer.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: ContentComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'auth/updateinfor', component: UpdateInforComponent},
  {path: 'auth/changepass', component: ChangePassComponent},
  {path: 'auth/dashboard', component: DashboardComponent},
  {path: 'song/my-playlist', component: ListSongComponent},
  {path: 'auth/personal', component: PersonalComponent},
  {path: 'song/play/:id', component: DetailSongComponent},
  {path: 'singer/song', component: SingerComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

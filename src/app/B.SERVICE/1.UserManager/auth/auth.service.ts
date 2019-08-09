import {Injectable} from '@angular/core';
import {LoginInfo} from '../../../A.MODEL/1.Request/UserManager/Login-Infor';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtResponse} from '../../../A.MODEL/2.Response/jwt-response';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {UpdateInfo} from '../../../A.MODEL/1.Request/UserManager/Update-Infor';
import {ChangePassword} from '../../../A.MODEL/1.Request/UserManager/ChangePass-Infor';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private registerUrl = 'http://localhost:8080/api/auth/signup';
  private updateProfileUrl = 'http://localhost:8080/api/auth/updateuser';
  private changePassUrl = 'http://localhost:8080/api/auth/changePassword';
  constructor(private http: HttpClient) {
  }

  loginAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  registerAuth(info: RegisterInfo): Observable<string> {
    return this.http.post<string>(this.registerUrl, info, httpOptions);
  }

  updateAuth(info: UpdateInfo): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.updateProfileUrl, info, httpOptions);
  }

  changePassword(info: ChangePassword): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.changePassUrl  , info, httpOptions);
  }
}

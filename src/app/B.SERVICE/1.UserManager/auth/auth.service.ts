import {Injectable} from '@angular/core';
import {LoginInfo} from '../../../A.MODEL/1.Request/UserManager/Login-Infor';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtResponse} from '../../../A.MODEL/2.Response/jwt-response';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {UpdateInfo} from '../../../A.MODEL/1.Request/UserManager/Update-Infor';
import {ChangePassword} from '../../../A.MODEL/1.Request/UserManager/ChangePass-Infor';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private avatarPathUrl = 'uploads/users/avatar';
  private registerUrl = 'http://localhost:8080/api/auth/signup';
  private updateProfileUrl = 'http://localhost:8080/api/auth/updateuser';
  private changePassUrl = 'http://localhost:8080/api/auth/changePassword';

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase) {
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

  changePasswordAuth(info: ChangePassword): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.changePassUrl  , info, httpOptions);
  }

  avatarPushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.avatarPathUrl}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTask.on(
      firebase
        .storage
        .TaskEvent
        .STATE_CHANGED,
      (snapshot) => {
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100); },
      (error) => {console.log(error); },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.avatarSaveFileData(fileUpload); });
      }
    );
  }

  protected avatarSaveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.avatarPathUrl}/`).push(fileUpload);
  }

  avatarGetFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.avatarPathUrl, ref =>
      ref.limitToLast(numberItems));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {UpdateInfo} from '../../../A.MODEL/1.Request/UserManager/Update-Infor';

@Injectable({providedIn: 'root'})
export class UserService {

  //  BACK-END API
  private userUrl = 'http://localhost:8080/api/users/user';
  private pmUrl = 'http://localhost:8080/api/users/pm';
  private adminUrl = 'http://localhost:8080/api/users/admin';
  private updateUserUrl = 'http://localhost:8080/api/auth/updateuser';
  private getUserUrl = 'http://localhost:8080/api/auth/user';


  // FIREBASE - API
  private userAvatarUrl = 'dangduc_project/userManager/avatar';


  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  // SERVICE CHO BACK-END
  getUserBoard(): Observable<RegisterInfo[]> {
    return this.http.get<RegisterInfo[]>(this.userUrl);
  }
  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, {responseType: 'text'});
  }
  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }
  getUpdateUser(username: string): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(`${this.updateUserUrl}/${username}`);
  }
  getUser(username: string): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(`${this.getUserUrl}/${username}`);
  }

  // SERVICE CHO FIREBASE
  public pushAvatarToStorage(fileUpload: FileUpload) {
    const storageReference = firebase.storage().ref();
    const uploadTaskAvatar = storageReference
      .child(`${this.userAvatarUrl}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTaskAvatar.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { const snap = snapshot as firebase.storage.UploadTaskSnapshot; },
      (error) => { console.log(error); },
      () => {
        uploadTaskAvatar.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveAvatarData(fileUpload); });
      }
    );
  }
  public saveAvatarData(fileUpload: FileUpload) {
    this.db.list(`${this.userAvatarUrl}/`).push(fileUpload);
  }
  public getAvatarUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.userAvatarUrl, ref =>
      ref.limitToLast(numberItems));
  }
  public deleteAvatarUpload(fileUpload: FileUpload) {
    this.deleteAvatarDatabase(fileUpload.key)
      .then(() => {
        this.deleteAvatarStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteAvatarDatabase(key: string) {
    return this.db.list(`${this.userAvatarUrl}/`).remove(key);
  }
  private deleteAvatarStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.userAvatarUrl}/${name}`).delete();
  }
}

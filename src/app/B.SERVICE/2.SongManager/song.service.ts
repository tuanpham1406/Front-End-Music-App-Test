import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from '../../A.MODEL/1.Request/SongManager/FileUpload';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {SongInfor} from '../../A.MODEL/1.Request/SongManager/Song-Infor';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SongService {
  private basePathAvatar = 'dangduc_project/songManager/avatar';
  private basePathFile = 'dangduc_project/songManager/fileMp3';

  private songUrl = 'http://localhost:8080/api/songs';

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
  }

  // XU LI SERVICE CHO FIREBASE
  public pushFileToStorage(fileUpload: FileUpload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePathFile}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {const snap = snapshot as firebase.storage.UploadTaskSnapshot; },
              (error) => { console.log(error); },
          () => {
                uploadTask.snapshot.ref
                  .getDownloadURL()
                  .then(downloadURL => {
                    console.log('File available at', downloadURL);
                    fileUpload.url = downloadURL;
                    fileUpload.name = fileUpload.file.name;
                    this.saveFileData(fileUpload); });
      }
    );
  } // Push file
  public saveFileData(fileUpload: FileUpload) {
    this.db
      .list(`${this.basePathFile}/`)
      .push(fileUpload)
      .then(  result => {console.log('saveFileData', result); });
  } // Save file
  public getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePathFile, ref => ref.limitToLast(numberItems));
  }  // Get file
  private deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {this.deleteFileStorage(fileUpload.name); })
      .catch(error => console.log(error));
  } // Delete file
  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePathFile}/`).remove(key);
  } // Delete file from Database
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePathFile}/${name}`).delete();
  } // Delete file from Storage
  pushAvatarToStorage(fileUpload: FileUpload) {
    const storageReference = firebase.storage().ref();
    const uploadTaskAvatar = storageReference.child(`${this.basePathAvatar}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTaskAvatar.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {const snap = snapshot as firebase.storage.UploadTaskSnapshot; },
      (error) => {console.log(error); },
      () => {
        uploadTaskAvatar.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveAvatarData(fileUpload);
        });
      }
    );
  }
  private saveAvatarData(fileUpload: FileUpload) {
    this.db.list(`${this.basePathAvatar}/`).push(fileUpload);
  }
  getAvatarUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePathAvatar, ref =>
      ref.limitToLast(numberItems));
  }
  deleteAvatarUpload(fileUpload: FileUpload) {
    this.deleteAvatarDatabase(fileUpload.key)
      .then(() => {
        this.deleteAvatarStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteAvatarDatabase(key: string) {
    return this.db.list(`${this.basePathAvatar}/`).remove(key);
  }
  private deleteAvatarStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePathAvatar}/${name}`).delete();
  }

  // XU LI SERVICE CHO BACK-END
  getSong(): Observable<SongInfor[]> {
    return this.http.get<SongInfor[]>(this.songUrl);
  }

  getSongById(id: number): Observable<SongInfor> {
    return this.http.get<SongInfor>(`${this.songUrl}/${id}`);
  }

  createSong(song: SongInfor): Observable<SongInfor> {
    return this.http.post<SongInfor>(this.songUrl, song);
  }

  updateSong(song: SongInfor): Observable<SongInfor> {
    return this.http.patch<SongInfor>(`${this.songUrl}/${song.id}`, song);
  }

  deleteSong(id: number): Observable<SongInfor> {
    return this.http.delete<SongInfor>(`${this.songUrl}/${id}`);
  }
}

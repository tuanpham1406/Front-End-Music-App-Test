import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from '../../A.MODEL/1.Request/SongManager/FileUpload';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {SongInfor} from '../../A.MODEL/1.Request/SongManager/Song-Infor';


@Injectable({
  providedIn: 'root'
})
export class SongService {
  private basePathAvatar = 'dangduc/avatar';
  private basePathFile = 'dangduc/fileMp3';

  private baseSongInfo = 'http://localhost:8080/api/songs';

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
  }

  // XU LI SERVICE CHO DATA BASSE
  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePathFile}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePathFile}/`).push(fileUpload);
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePathFile, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePathFile}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePathFile}/${name}`).delete();
  }

  pushAvatarToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageReference = firebase.storage().ref();
    const uploadTaskAvatar = storageReference.child(`${this.basePathAvatar}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTaskAvatar.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
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
    return this.http.get<SongInfor[]>(this.baseSongInfo);
  }

  getSongById(id: number): Observable<SongInfor> {
    return this.http.get<SongInfor>(`${this.baseSongInfo}/${id}`);
  }

  createSong(song: SongInfor): Observable<SongInfor> {
    return this.http.post<SongInfor>(this.baseSongInfo, song);
  }

  updateSong(song: SongInfor): Observable<SongInfor> {
    return this.http.patch<SongInfor>(`${this.baseSongInfo}/${song.id}`, song);
  }
  deleteSong(id: number): Observable<SongInfor> {
    return this.http.delete<SongInfor>(`${this.baseSongInfo}/${id}`);
  }
}

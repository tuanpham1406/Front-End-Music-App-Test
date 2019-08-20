import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PlaylistInfor} from '../../A.MODEL/1.Request/PlaylistManager/Playlist-Infor';
import {SongInfor} from '../../A.MODEL/1.Request/SongManager/Song-Infor';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private basePath = 'dangduc/playlists/playlist';

  private playlistUrl = 'http://localhost:8080/api/playlist';

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient) {}

  // METHOD CHO FIREBASE
  // METHOD CHO BACKEND
  createPlaylist(playlist: PlaylistInfor): Observable<PlaylistInfor> {
    return this.http.post<PlaylistInfor>(this.playlistUrl, playlist);
  }

  getPlayListAll(): Observable<PlaylistInfor[]> {
    return this.http.get<PlaylistInfor[]>(this.playlistUrl);
  }

  getPlayListById(id: number): Observable<PlaylistInfor> {
    return this.http.get<PlaylistInfor>(`${this.playlistUrl}/${id}`);
  }

  updatePlayList(playlist: PlaylistInfor): Observable<PlaylistInfor> {
    return this.http.patch<PlaylistInfor>(`${this.playlistUrl}/${playlist.id}`, playlist);
  }

  deletePlayList(id: number): Observable<PlaylistInfor> {
    return this.http.delete<PlaylistInfor>(`${this.playlistUrl}/${id}`);
  }

}

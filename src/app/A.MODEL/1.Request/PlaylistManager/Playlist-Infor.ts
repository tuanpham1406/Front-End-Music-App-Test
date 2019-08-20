import {SongInfor} from '../SongManager/Song-Infor';
import {RegisterInfo} from '../UserManager/Register-Infor';

export class PlaylistInfor {
  id: number;
  playlistName: string;
  songs: SongInfor[];
  users: RegisterInfo[];


  constructor(id: number, playlistName: string, songs: SongInfor[], users: RegisterInfo[]) {
    this.id = id;
    this.playlistName = playlistName;
    this.songs = songs;
    this.users = users;
  }
}

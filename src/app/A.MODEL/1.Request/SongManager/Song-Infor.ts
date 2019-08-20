import {FileUpload} from './FileUpload';

export class SongInfor {
  id: number;
  nameSong: string;
  singer: string;
  category: string;
  lyrics: string;
  avatarUrl: string;
  mp3Url: string;
  likeSong: number;
  listenSong: number;


  constructor(nameSong: string, singer: string,
              category: string, lyrics: string, avatarUrl: string,
              mp3Url: string, likeSong: number, listenSong: number) {
    this.nameSong = nameSong;
    this.singer = singer;
    this.category = category;
    this.lyrics = lyrics;
    this.avatarUrl = avatarUrl;
    this.mp3Url = mp3Url;
    this.likeSong = likeSong;
    this.listenSong = listenSong;
  }
}

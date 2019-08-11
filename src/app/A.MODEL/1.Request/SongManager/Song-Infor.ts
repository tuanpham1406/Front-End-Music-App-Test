export class SongInfor {
  nameSong: string;
  singer: string;
  category: string;
  infor: string;
  songUrl: string;
  avatarUrl: string;

  constructor(nameSong: string, singer: string, category: string, infor: string, songUrl: string, avatarUrl: string) {
    this.nameSong = nameSong;
    this.singer = singer;
    this.category = category;
    this.infor = infor;
    this.songUrl = songUrl;
    this.avatarUrl = avatarUrl;
  }
}

import {FileUpload} from './FileUpload';

export class SongInfor {
  id: number;
  key: string;
  nameSong: string;
  singer: string;
  category: string;
  infor: string;

  constructor(nameSong: string, singer: string, category: string, infor: string) {
    this.nameSong = nameSong;
    this.singer = singer;
    this.category = category;
    this.infor = infor;
  }
}

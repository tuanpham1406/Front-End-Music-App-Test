import {FileUpload} from './FileUpload';

export class SongInfor{
  key: string;
  nameSong: string;
  singer: string;
  category: string;
  infor: string;
  fileUrl: FileUpload;
  avatarUrl: FileUpload;

  constructor(nameSong: string, singer: string, category: string, infor: string) {
    this.nameSong = nameSong;
    this.singer = singer;
    this.category = category;
    this.infor = infor;
  }

}

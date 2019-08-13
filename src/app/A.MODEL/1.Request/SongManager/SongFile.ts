import {FileUpload} from './FileUpload';

export class SongFile {
  avatar: FileUpload;
  filemp3: FileUpload;


  constructor(avatar: FileUpload, filemp3: FileUpload) {
    this.avatar = avatar;
    this.filemp3 = filemp3;
  }
}

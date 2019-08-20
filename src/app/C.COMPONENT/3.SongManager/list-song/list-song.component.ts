import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {SongInfor} from '../../../A.MODEL/1.Request/SongManager/Song-Infor';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';

interface MyPlaylist {
  id?: number;
  name: string;
}

const MYPLAYLIST: MyPlaylist[] = [
  {name: 'Anh thương em nhất mà'},
  {name: 'Tâm lặng như nước'},
  {name: 'Xanh lục'},
  {name: 'I wan\'t something just like this'},
  {name: 'Một bước yêu vạn dặm đau'},
];

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = MYPLAYLIST.length;
  delete: SongInfor;
  get myPlaylist(): MyPlaylist[] {
    return MYPLAYLIST
      .map((myPlaylist, i) => ({id: i + 1, ...myPlaylist}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  songList: SongInfor[] = [];
  song: SongInfor;
  fileDelete: FileUpload;

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService
      .getSong()
      .subscribe(
        data => {
          this.songList = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteSong(id: number) {
    debugger;
    // Xóa trong Backend
    this.songService
      .deleteSong(id)
      .subscribe(
        data => {
          this.delete = data;
          window.location.reload(); },
        error => {this.delete = null; }
      );
    // Xóa ảnh, MP3 trong Firebase
  }
}

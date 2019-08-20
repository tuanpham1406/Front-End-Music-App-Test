import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {SongInfor} from '../../../A.MODEL/1.Request/SongManager/Song-Infor';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  songInfor: SongInfor[] = [];
  topListen: SongInfor[] = [];
  topLike: SongInfor[] = [];
  constructor(
    private songService: SongService) {
  }

  ngOnInit() {
    debugger;
    this.songService
      .getSong()
      .subscribe(
        next => {this.songInfor = next; },
        error => {this.songInfor = []; }
      );

    this.songService
      .getListenSong()
      .subscribe(
        data => { this.topListen = data; },
        error => {this.topListen = []; }
      );
    this.songService
      .getLikeSong()
      .subscribe(
        data => {this.topLike = data; },
        error => {this.topLike = []; }
      );
  }
}

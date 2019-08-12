import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private songService: SongService) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload) {
    this.songService
      .songDeleteFileUpload(fileUpload);
  }
}

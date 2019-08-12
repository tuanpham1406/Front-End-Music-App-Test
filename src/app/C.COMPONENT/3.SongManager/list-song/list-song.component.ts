import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  fileUploads: any[];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService
      .songGetFileUploads(6)
      .snapshotChanges().pipe(map(
        changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(fileUploads => {this.fileUploads = fileUploads;
    });
  }
}

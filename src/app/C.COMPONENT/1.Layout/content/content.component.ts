import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {map} from 'rxjs/operators';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  fileMp3Uploads: any[];
  fileAvatarUploads: any[];
  fileNumber = 0;

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService
      .getFileUploads(100)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))))
      .subscribe(
        fileUploads => {
          this.fileMp3Uploads = fileUploads;
        });

    this.songService
      .getAvatarUploads(100)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))))
      .subscribe(
        fileUploads => {
          this.fileAvatarUploads = fileUploads;
        });
  }

}
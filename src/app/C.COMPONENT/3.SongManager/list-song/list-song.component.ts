import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../../../B.SERVICE/2.UploadFile/upload-file.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  fileUploads: any[];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.uploadService
      .getFileUploads(6)
      .snapshotChanges().pipe(map(
        changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(fileUploads => {this.fileUploads = fileUploads;
    });
  }
}

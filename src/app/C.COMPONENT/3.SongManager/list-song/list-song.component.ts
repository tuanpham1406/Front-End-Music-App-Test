import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../../../B.SERVICE/2.UploadFile/upload-file.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  showFile = false;
  fileUploads: Observable<string[]>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {UploadFileService} from '../../../B.SERVICE/2.UploadFile/upload-file.service';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}

import { Component, OnInit } from '@angular/core';
import {FileUpload} from '../../../../A.MODEL/1.Request/SongManager/FileUpload';
import {CaroselService} from '../../../../B.SERVICE/0.Layout/carosel.service';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.scss']
})
export class CaroselComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private caroselService: CaroselService) { }

  ngOnInit() {
  }

  selectCarosel(event) {
    this.selectedFiles = event.target.files;
    this.uploadCarosel();
  }

  uploadCarosel() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.caroselService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

}

import { Component, OnInit } from '@angular/core';
import {FileUpload} from '../../../../A.MODEL/1.Request/SongManager/FileUpload';
import {CaroselService} from '../../../../B.SERVICE/0.Layout/carosel.service';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.scss']
})
export class CaroselComponent implements OnInit {
  images = [1].map(() => `https://i.ytimg.com/vi/z8S7SZ4sJF0/maxresdefault.jpg`);
  images1 = [2].map(() => `https://i.ytimg.com/vi/MIGCCcQkV-w/maxresdefault.jpg`);
  images2 = [3].map(() => `https://i.ytimg.com/vi/jFzfkOulKEo/maxresdefault.jpg`);
  images3 = [4].map(() => `https://reviewsmoi.com/wp-content/uploads/2019/03/mot-buoc-yeu-van-dam-dau-1.jpg`);
  images4 = [5].map(() => `https://i.ytimg.com/vi/pz_23dIZgVQ/maxresdefault.jpg`);
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

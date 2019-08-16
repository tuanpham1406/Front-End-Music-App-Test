import { Component, OnInit } from '@angular/core';
import {FileUpload} from '../../../../A.MODEL/1.Request/SongManager/FileUpload';


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

  constructor() { }

  ngOnInit() {}

}

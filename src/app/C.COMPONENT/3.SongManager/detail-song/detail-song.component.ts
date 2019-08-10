import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  @Input() fileUpload: string;

  constructor() {
  }

  ngOnInit() {
  }

}

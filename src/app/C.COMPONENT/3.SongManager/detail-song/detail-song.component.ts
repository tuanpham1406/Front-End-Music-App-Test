import {Component, OnInit} from '@angular/core';

declare function playDock(): any;

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    playDock();
  }
}

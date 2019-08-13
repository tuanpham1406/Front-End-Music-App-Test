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

  constructor(private songService: SongService) { }

  ngOnInit() {
  }
}

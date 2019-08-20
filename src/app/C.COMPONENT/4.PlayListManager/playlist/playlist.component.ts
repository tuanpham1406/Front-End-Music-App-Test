import { Component, OnInit } from '@angular/core';
import {PlaylistInfor} from '../../../A.MODEL/1.Request/PlaylistManager/Playlist-Infor';
import {PlaylistService} from '../../../B.SERVICE/3.PlaylistManager/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {SongInfor} from '../../../A.MODEL/1.Request/SongManager/Song-Infor';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

declare function playDock(): any;

declare function commentFb(): any;

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {
  song: SongInfor;

  constructor(
    private songService: SongService,
    private route: ActivatedRoute, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.songService
      .getSongById(id)
      .subscribe(
        next => {
          this.song = next;
        },
        error => {
          this.song = null;
        }
      );
    playDock();
    commentFb();
  }

  open(content) {
    this.modalService.open(content);
  }
}

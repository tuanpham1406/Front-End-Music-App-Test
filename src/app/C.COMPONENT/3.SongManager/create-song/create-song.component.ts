import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {SongInfor} from '../../../A.MODEL/1.Request/SongManager/Song-Infor';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  selectedMp3Files: FileList;
  selectedAvatarFile: FileList;
  currentAvatarFileUpload: FileUpload;
  currentMp3FileUpload: FileUpload;
  form: any = {};
  // =========================================
  songInfor: SongInfor[] = [];
  createSongInfo: SongInfor;

  constructor(
    private songService: SongService,
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.songService
      .getSong()
      .subscribe(
        data => (this.songInfor = data),
        error => (this.songInfor = []));
  }

  // FIREBASE SERVER
  selectAvatar(event) {
    this.selectedAvatarFile = event.target.files;
  }

  uploadAvatar() {
    const avatarFile = this.selectedAvatarFile.item(0);
    this.selectedAvatarFile = undefined;

    this.currentAvatarFileUpload = new FileUpload(avatarFile);
    this.songService.pushAvatarToStorage(this.currentAvatarFileUpload);
  }

  selectFile(event) {
    this.selectedMp3Files = event.target.files;
  }

  uploadMp3() {
    const mp3File = this.selectedMp3Files.item(0);
    this.selectedMp3Files = undefined;

    this.currentMp3FileUpload = new FileUpload(mp3File);
    this.songService.pushFileToStorage(this.currentMp3FileUpload);
  }

  // BACK-END SERVER
  createSong() {
    debugger;
    this.createSongInfo = new SongInfor(
      this.form.nameSong,
      this.form.singer,
      this.form.category,
      this.form.lyrics,
      this.currentAvatarFileUpload.url,
      this.currentMp3FileUpload.url
    );
    this.songService
      .createSong(this.createSongInfo)
      .subscribe(
        data => {
          // this.songInfor.unshift(data);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.songInfor = null;
        }
      );
  }
}

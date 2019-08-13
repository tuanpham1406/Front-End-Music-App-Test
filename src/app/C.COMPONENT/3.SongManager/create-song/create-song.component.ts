import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {SongInfor} from '../../../A.MODEL/1.Request/SongManager/Song-Infor';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  form: any = {};
  createSongInfo: SongInfor;
  isCreateSong = false;
  isCreateSongFailed = false;
  errorMessage = '';

  constructor(
    private songService: SongService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  selectAvatar(event) {
    this.selectedFiles = event.target.files;
    this.uploadAvatar();
  }

  uploadAvatar() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.songService.pushAvatarToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.songService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  submit() {
    this.createSongInfo = new SongInfor(
      this.form.nameSong,
      this.form.singer,
      this.form.category,
      this.form.infor
    );
  }
}

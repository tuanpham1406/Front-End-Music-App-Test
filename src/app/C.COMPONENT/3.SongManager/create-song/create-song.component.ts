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
  // =============OLD ======================
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  form: any = {};
  // =========================================
  songInfor: SongInfor[] = [];
  createSongInfo: SongInfor;
  songForm: FormGroup;

  fileMp3All: any[] = [];
  fileAvatarAll: any[] = [];

  fileMp3Url: string;
  fileAvatarUrl: string;


  constructor(
    private songService: SongService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.songForm = this.fb.group({
      nameSong: ['', Validators.required],
      singer: ['', Validators.required],
      category: ['', Validators.required],
      lyrics: ['', Validators.required],
    });
    this.songService
      .getSong()
      .subscribe(
        data => (this.songInfor = data),
        error => (this.songInfor = [])
      );

    this.songService
      .getAvatarUploads(100)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))))
      .subscribe(
        fileUploads => {
          this.fileAvatarAll = fileUploads;
        });

    this.songService
      .getFileUploads(100)
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))))
      .subscribe(
        fileUploads => {
          this.fileMp3All = fileUploads;
        });

  }

  // FIREBASE SERVER
  selectAvatar(event) {
    this.selectedFiles = event.target.files;
    this.uploadAvatar();
  }
  uploadAvatar() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.songService.pushAvatarToStorage(this.currentFileUpload);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.songService.pushFileToStorage(this.currentFileUpload);
  }

  // BACK-END SERVER
  createSong() {
    this.fileMp3Url = this.fileMp3All[this.fileMp3All.length - 1].url;
    this.fileAvatarUrl = this.fileAvatarAll[this.fileAvatarAll.length - 1].url;
    if (this.songForm.valid) {
      const {value} = this.songForm;
      this.createSongInfo = new SongInfor(
        value.nameSong,
        value.singer,
        value.category,
        value.lyrics,
        this.fileAvatarUrl,
        this.fileMp3Url
      );
      this.songService
        .createSong(this.createSongInfo)
        .subscribe(
          data => {
            this.songInfor.unshift(data);
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error);
            this.songInfor = null;
          }
        );
    }
  }
}

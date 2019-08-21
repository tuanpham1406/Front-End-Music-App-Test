import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {SongService} from '../../../B.SERVICE/2.SongManager/song.service';
import {SongInfor} from '../../../A.MODEL/1.Request/SongManager/Song-Infor';
import {CategoryService} from '../../../B.SERVICE/5.Category/category.service';
import {CategoryInfor} from '../../../A.MODEL/1.Request/CategoryManager/Category-Infor';
import {TokenStorageService} from '../../../B.SERVICE/1.UserManager/token/token-storage.service';
import {Router} from '@angular/router';



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
  like: number;
  listen: number;
  // =========================================
  progress: { percentage: number } = { percentage: 0 };
  progressmp3: { percentage: number } = { percentage: 0 };
  songInfor: SongInfor[] = [];
  categoryInfor: CategoryInfor[] = [];
  createSongInfo: SongInfor;

  isCreateSong = false;
  isCreateSongFail = false;

  constructor(
    private songService: SongService,
    private http: HttpClient,
    private router: Router,
    private categoryService: CategoryService,
    private token: TokenStorageService) {
  }

  ngOnInit() {
    this.like = 0;
    this.listen = 0;
    this.songService
      .getSong()
      .subscribe(
        data => (this.songInfor = data),
        error => (this.songInfor = []));

    this.categoryService
      .getCategory()
      .subscribe(
        data => {this.categoryInfor = data; },
        error => {this.categoryInfor = []; }
      );
    this.token.getUsername();
  }

  // FIREBASE SERVER
  selectAvatar(event) {
    this.selectedAvatarFile = event.target.files;
  }

  uploadAvatar() {
    const avatarFile = this.selectedAvatarFile.item(0);
    this.selectedAvatarFile = undefined;

    this.currentAvatarFileUpload = new FileUpload(avatarFile);
    this.songService.pushAvatarToStorage(this.currentAvatarFileUpload, this.progress);
  }

  selectFile(event) {
    this.selectedMp3Files = event.target.files;
  }

  uploadMp3() {
    const mp3File = this.selectedMp3Files.item(0);
    this.selectedMp3Files = undefined;

    this.currentMp3FileUpload = new FileUpload(mp3File);
    this.songService.pushFileToStorage(this.currentMp3FileUpload, this.progressmp3);
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
      this.currentMp3FileUpload.url,
      this.like,
      this.listen
    );
    this.songService
      .createSong(this.createSongInfo)
      .subscribe(
        data => {
          console.log(data);
          this.isCreateSong = true;
          this.isCreateSongFail = false;
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.isCreateSongFail = true;
        }
      );
  }
}

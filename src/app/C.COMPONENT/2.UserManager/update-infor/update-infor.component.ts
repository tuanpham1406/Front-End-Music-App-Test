import {Component, OnInit} from '@angular/core';
import {UpdateInfo} from '../../../A.MODEL/1.Request/UserManager/Update-Infor';
import {AuthService} from '../../../B.SERVICE/1.UserManager/auth/auth.service';
import {TokenStorageService} from '../../../B.SERVICE/1.UserManager/token/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-infor',
  templateUrl: './update-infor.component.html',
  styleUrls: ['./update-infor.component.scss']
})
export class UpdateInforComponent implements OnInit {
  form: any = {};
  progress = 0;
  updateInfo: UpdateInfo;
  isUpdated = false;
  isUpdateFailed = false;
  errorMessage = '';
  data: FormData = new FormData();
  fileList: FileList;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.fileList = event.target.files;
  }

  onSubmit() {
    this.updateInfo = new UpdateInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.email
    );

    this.authService
      .updateAuth(this.updateInfo)
      .subscribe(
        data => {
                      console.log(data);
                      this.isUpdated = true;
                      this.isUpdateFailed = false;
                      this.router.navigate(['/home']); },
        error => {
                      console.log(error);
                      this.errorMessage = error.error.message;
                      this.isUpdateFailed = true; });
  }
}



import {Component, OnInit} from '@angular/core';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {AuthService} from '../../../B.SERVICE/1.UserManager/auth/auth.service';
import {FileUpload} from '../../../A.MODEL/1.Request/SongManager/FileUpload';
import {UserService} from '../../../B.SERVICE/1.UserManager/user/user.service';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  form: any = {};
  // ==============================================
  registerForm: RegisterInfo;
  isRegister = false;
  isRegisterFail = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      usernamr: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  selecAvatar(event) {

    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.userService.pushAvatarToStorage(this.currentFileUpload);
    console.log(this.currentFileUpload);
  }

  RegisterAccount() {
    debugger;
    this.registerForm = new RegisterInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.username,
      this.form.email,
      this.form.password,
      this.currentFileUpload.url
    );

    this.authService
      .registerAuth(this.registerForm)
      .subscribe(
        data => {
          console.log(data);
          this.isRegister = true;
          this.isRegisterFail = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isRegisterFail = true;
        });
  }
}

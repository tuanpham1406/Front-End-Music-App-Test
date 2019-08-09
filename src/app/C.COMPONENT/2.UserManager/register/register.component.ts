import { Component, OnInit } from '@angular/core';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {AuthService} from '../../../B.SERVICE/1.UserManager/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  registerInfo: RegisterInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);
    this.registerInfo = new RegisterInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.confirmPassWord
    );

    this.authService
      .registerAuth(this.registerInfo)
      .subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false; },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true; });
  }
}

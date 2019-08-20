import { Component, OnInit } from '@angular/core';
import {ChangePassword} from '../../../A.MODEL/1.Request/UserManager/ChangePass-Infor';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../B.SERVICE/1.UserManager/auth/auth.service';
import {Router} from '@angular/router';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {passwordnotmatch: true};
}

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  form: any = {};
  changePassword: ChangePassword;
  isChangePassed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  ngSubmit() {
    debugger;
    this.changePassword = new ChangePassword(
      this.form.currentPassword,
      this.form.newPassword);

    this.authService
      .changePasswordAuth(this.changePassword)
      .subscribe(
        data => {
          console.log(data);
          this.isChangePassed = true;
          this.router.navigate(['/home']); },
        error => {console.log(error); this.errorMessage = error.error.message; });
  }
}


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
  changeForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.changeForm = this.fb.group({
      currentPassword: ['', Validators.required],
      pwGroup: this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {validator: comparePassword})
  });
  }

  ngSubmit() {
    this.changePassword = new ChangePassword(
      this.form.currentPassword,
      this.form.newPassword,
      this.form.confirmNewPassword);

    this.authService
      .changePasswordAuth(this.changePassword)
      .subscribe(
        data => {console.log(data); this.router.navigate(['/home']); },
        error => {console.log(error); this.errorMessage = error.error.message; });
  }
}


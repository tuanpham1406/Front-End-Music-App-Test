import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../B.SERVICE/1.UserManager/user/user.service';
import {UserInfo} from 'firebase';
import {RegisterInfo} from '../../../A.MODEL/1.Request/UserManager/Register-Infor';
import {UpdateInfo} from '../../../A.MODEL/1.Request/UserManager/Update-Infor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInfor: UpdateInfo;
  errorMessage: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    const name = sessionStorage.getItem('AuthUsername');
    this.userService
      .getUser(name)
      .subscribe(
        data => { this.userInfor = data; },
        error => {this.userInfor = null; }
      );

  }

}

import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../B.SERVICE/1.UserManager/user/user.service';
import {TokenStorageService} from '../../../../B.SERVICE/1.UserManager/token/token-storage.service';
import {Router} from '@angular/router';
import {UserInfo} from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  board: any = [];
  errorMessage: string;
  info: any;
  userInfor: UserInfo;

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService
      .getUserBoard()
      .subscribe(
        data => {
          this.board = data;
        },
        error => {
          console.log(error);
        });

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      avatar: this.token.getAvatar(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.Logout();
    window.location.reload();
  }
}

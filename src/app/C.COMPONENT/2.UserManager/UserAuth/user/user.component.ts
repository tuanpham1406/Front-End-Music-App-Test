import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../B.SERVICE/1.UserManager/user/user.service';
import {TokenStorageService} from '../../../../B.SERVICE/1.UserManager/token/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  info: any;

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {this.board = data; },
      error => {this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`; });
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.Logout();
    window.location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../B.SERVICE/1.UserManager/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  board: string;
  errorMessage: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService
      .getUserBoard()
      .subscribe(
        data => {this.board = data; },
        error => {this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`; });
  }

}

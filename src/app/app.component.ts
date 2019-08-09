import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './B.SERVICE/1.UserManager/token/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private roles: string[];
  protected authority: string;
  info: any;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities()
    };
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthorized: boolean = false;
  userName: string;

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    if (!this.tokenManagerService.LoginShouldBeRemembered) {
      this.tokenManagerService.clearUserData();
    }
  }

  constructor(
    private tokenManagerService: TokenManagerService,
    private router: Router ) { }

  ngOnInit(): void {
    this.tokenManagerService.loggerDetector
      .subscribe((loggedIn: boolean) => {
        if (loggedIn == true) {
          this.isAuthorized = this.tokenManagerService.IsAuthorized;
          this.userName = this.tokenManagerService.UserName;
          this.router.navigate(["/tracking"]);
        } else {
          this.isAuthorized = false;
          this.userName = '';
          this.router.navigate(["/auth/login"]);
        }
    });
  }

  onLogout(): void {
    this.tokenManagerService.clearUserData();
  }

}

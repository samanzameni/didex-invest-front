import { Component, OnInit } from '@angular/core';
import { AuthService, TraderService } from '../core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private traderService: TraderService
  ) {}

  ngOnInit() {}

  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  get traderEmail(): string {
    return this.authService.decodedToken.email;
  }

  requestSignOut(): void {
    this.authService.requestSignOut();
  }

  get personalInfo(): string {
    const trader = this.traderService.currentTrader;
    return !!trader && !!trader.generalInformation
      ? trader.personalInformation.firstName
      : 'Trader';
  }
}

import { Component } from '@angular/core';
import { LocaleService, TawkToService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private localeService: LocaleService,
    private tawkToService: TawkToService
  ) {}
}

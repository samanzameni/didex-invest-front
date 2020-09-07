import { Component, OnInit } from '@angular/core';
import { LocaleService, TawkToService, DirectionService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localeService: LocaleService,
    private tawkToService: TawkToService,
    private directionService: DirectionService
  ) {}

  ngOnInit(): void {
    const body = document.querySelector('body');
    this.directionService.direction$.subscribe((dir) => {
      body.setAttribute('dir', dir);
    });

    this.localeService.locale$.subscribe((locale) => {
      body.classList.value = locale;
    });
  }
}

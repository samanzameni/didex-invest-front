import { Component } from '@angular/core';
import {
  LocaleService,
  TawkToService,
  DirectionService,
  Direction,
  Locale,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private localeService: LocaleService,
    private tawkToService: TawkToService,
    private directionService: DirectionService
  ) {}

  get direction$(): Observable<Direction> {
    return this.directionService.direction$;
  }

  get locale$(): Observable<Locale> {
    return this.localeService.locale$;
  }
}

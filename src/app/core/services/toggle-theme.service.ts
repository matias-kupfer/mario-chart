import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleThemeService {
  public darkMode = new Subject<boolean>();

  constructor() {
    this.darkMode.next(true);
  }

  public toggle(state: boolean): void {
    this.darkMode.next(state);
  }
}

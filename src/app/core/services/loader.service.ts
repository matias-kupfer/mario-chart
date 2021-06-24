import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderState$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  show(): any {
    this.loaderState$.next(true);
  }
  hide(): any {
    this.loaderState$.next(false);
  }
}

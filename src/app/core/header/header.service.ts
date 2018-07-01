import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerTitleUpdated = new Subject<string>();

  constructor() { }

  getHeaderTitleListener() {
    return this.headerTitleUpdated.asObservable();
  }

  setHeaderTitle(title: string) {
    this.headerTitleUpdated.next(title);
  }
}

import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private default: string = 'Workout Tracker';
  private headerTitleUpdated = new Subject<string>();
  public showCreateNewUpdated = new Subject<{show: boolean, which: string}>();
  public showOpenTimerUpdated = new Subject<boolean>();

  constructor() { }

  getHeaderTitleListener() {
    return this.headerTitleUpdated.asObservable();
  }

  getShowCreateNewListener() {
    return this.showCreateNewUpdated.asObservable();
  }

  getShowOpenTimerListener() {
    return this.showOpenTimerUpdated.asObservable();
  }

  setHeaderTitle(params: {title?: string; default?: boolean;}) {
    if (params.title) {
      this.headerTitleUpdated.next(params.title);
    } else if (params.default) {
      this.headerTitleUpdated.next(this.default);
    }
  }

  setShowCreateNew(params: {show: boolean, which?: string}) {
    let output = {show: false, which: undefined}
    if (params.show) {
      output.show = params.show;
    }
    if (params.which) {
      output.which = params.which.toLowerCase();
    }
    this.showCreateNewUpdated.next(output);
  }

  setShowOpenTimer(params: { show: boolean }) {
    let output = {show: false }
    if (params.show) {
      output.show = params.show;
    }
    this.showOpenTimerUpdated.next(output.show);
  }


}

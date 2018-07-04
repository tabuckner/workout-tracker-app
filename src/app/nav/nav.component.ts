import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderService } from '../core/header/header.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public reactiveTitle: string = 'Workout Tracker'
  public showAddButton: boolean = false;
  public createNewPath: string;
  public headerTitleSub: Subscription;
  public headerAddSub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private header: HeaderService
  ) { }

  ngOnInit() {
   this.getHeaderTitleSub();
   this.getAddButtonSub();
  }

  getCreateNewPath() {
    return '/';
  }

  getHeaderTitleSub() {
    this.headerTitleSub = this.header.getHeaderTitleListener()
    .subscribe(newTitle => {
      this.reactiveTitle = newTitle
    });
  }

  getAddButtonSub() {
    this.headerAddSub = this.header.getShowCreateNewListener()
      .subscribe(e => {
        this.showAddButton = e.show;
        if (e.which) {
          this.createNewPath = `${e.which}/create`
        }
      })
  }

  ngOnDestroy() {
    this.headerTitleSub.unsubscribe();
    this.headerAddSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Subscription } from 'rxjs';
import { Routine } from '../../shared/models/routine.model';
import { HeaderService } from '../../core/header/header.service';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss']
})
export class RoutineListComponent implements OnInit, OnDestroy {
  public routines: Routine[];
  public isLoading = false;
  public routineSub: Subscription;

  constructor(
    private api: ApiService,
    private header: HeaderService) { }

  ngOnInit() {
    this.header.setHeaderTitle({title: 'My Routines'}); // TODO: Combine these into one header init method on the method service.
    this.header.setShowCreateNew({show: true, which: 'routines'});
    this.loadRoutines();
  }

  loadRoutines() {
    this.isLoading = true;
    this.api.getAllRoutines();
    this.routineSub = this.api.getRoutineUpdateListener()
      .subscribe((fetchedRoutines: Routine[]) => {
        this.isLoading = false;
        this.routines = fetchedRoutines;
        console.log(this.routines);
      })
  }

  ngOnDestroy() {
    this.header.setShowCreateNew({show: false});
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Subscription } from 'rxjs';
import { Routine } from '../../shared/models/routine.model';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss']
})
export class RoutineListComponent implements OnInit {
  public routines: Routine[];
  public isLoading = false;
  public routineSub: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
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

}

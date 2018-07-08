import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Subscription } from 'rxjs';
import { Routine } from '../../shared/models/routine.model';
import { HeaderService } from '../../core/header/header.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

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
    private header: HeaderService,
    private dialog: MatDialog) { }

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
      });
  }

  onDeleteRoutine(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      closeOnNavigation: true,
      data: { action: 'Delete Routine', message: 'Are you sure you want to delete this routine?'}
    });
    dialogRef.afterClosed().subscribe(willDelete => {
      if (willDelete) {
        this.api.deleteRoutine(id);
      }
    });
  }

  ngOnDestroy() {
    this.header.setShowCreateNew({show: false});
  }

}

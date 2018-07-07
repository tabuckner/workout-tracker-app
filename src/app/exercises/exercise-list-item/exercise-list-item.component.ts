import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../shared/models/exercise.model';
import { ApiService } from '../../core/api/api.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent implements OnInit {
  @Input() exercise: Exercise;
  description: string = 'Define a Desc'; // TODO: Do we need?
  icon: string = 'help'; // TODO: Do we need?

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onDeleteExercise(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      closeOnNavigation: true,
      data: { action: 'Delete Exercise', message: 'Deleting this will remove the exercise from all of your Routines. Are you sure you want to delete this exercise?'}
    });
    dialogRef.afterClosed().subscribe(willDelete => {
      if (willDelete) {
        this.api.deleteExercise(id);
      }
    });
  }

}

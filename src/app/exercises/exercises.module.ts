import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { SharedModule } from '../shared/shared.module';
import { ExerciseListItemComponent } from './exercise-list-item/exercise-list-item.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    NewExerciseComponent,
    ExerciseListItemComponent,
    ExerciseListComponent
  ],
  exports: [
    NewExerciseComponent,
    ExerciseListItemComponent,
    ExerciseListComponent
  ]
})
export class ExercisesModule { }

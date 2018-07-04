import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutineListComponent } from './routine-list/routine-list.component';
import { NewRoutineComponent } from './new-routine/new-routine.component';
import { SharedModule } from '../shared/shared.module';
import { ExercisesModule } from '../exercises/exercises.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ExercisesModule
  ],
  declarations: [
    RoutineListComponent,
    NewRoutineComponent
  ]
})
export class RoutinesModule { }

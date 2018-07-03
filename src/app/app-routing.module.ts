import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoutineListComponent } from './routines/routine-list/routine-list.component';
import { ExerciseListComponent } from './exercises/exercise-list/exercise-list.component';
import { NewExerciseComponent } from './exercises/new-exercise/new-exercise.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'routines', component: RoutineListComponent},
  { path: 'exercises', component: ExerciseListComponent},
  { path: 'create-exercise', component: NewExerciseComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

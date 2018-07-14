import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoutineListComponent } from './routines/routine-list/routine-list.component';
import { ExerciseListComponent } from './exercises/exercise-list/exercise-list.component';
import { NewExerciseComponent } from './exercises/new-exercise/new-exercise.component';
import { NewRoutineComponent } from './routines/new-routine/new-routine.component';
import { LogInComponent } from './core/login/login.component';
import { JournalEntryListComponent } from './journal/journal-entry-list/journal-entry-list.component';
import { NewJournalEntryComponent } from './journal/new-journal-entry/new-journal-entry.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'routines', component: RoutineListComponent },
  { path: 'routines/create', component: NewRoutineComponent }, // Add Lazy Routing to create component routes.
  { path: 'routines/:id', component: NewRoutineComponent }, // Add Lazy Routing to create component routes.
  { path: 'exercises', component: ExerciseListComponent },
  { path: 'exercises/create', component: NewExerciseComponent }, // Add Lazy Routing to create component routes.
  { path: 'exercises/:id', component: NewExerciseComponent }, // Add Lazy Routing to create component routes.
  { path: 'journal', component: JournalEntryListComponent }, // Add Lazy Routing to create component routes.
  { path: 'journal/create', component: NewJournalEntryComponent }, // Add Lazy Routing to create component routes.
  // { path: 'journal/:id', component: NewJournalEntryComponent }, // Add Lazy Routing to create component routes.

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

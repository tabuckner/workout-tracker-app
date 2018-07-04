import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../../shared/models/exercise.model';
import { HeaderService } from '../../core/header/header.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  exercises: Exercise[] = [];
  exerciseSub: Subscription;

  constructor(
    private api: ApiService,
    private header: HeaderService) { }

  ngOnInit() {
    this.header.setHeaderTitle({title: 'My Exercises'});
    this.header.setShowCreateNew({show: true, which: 'exercises'})
    this.loadExercises();
  }

  loadExercises() {
    this.isLoading = true;
    this.api.getAllExercises();
    this.exerciseSub = this.api.getexerciseUpdateListener()
      .subscribe((fetchedExercises: Exercise[]) => {
        this.isLoading = false;
        this.exercises = fetchedExercises;
        console.log(this.exercises);
      })
  }

  ngOnDestroy() {
    this.header.setShowCreateNew({show: false});
  }

}

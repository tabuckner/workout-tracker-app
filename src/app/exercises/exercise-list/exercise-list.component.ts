import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api/api.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  isLoading: boolean = false;
  exercises: Exercise[] = [];
  exerciseSub: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
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

}

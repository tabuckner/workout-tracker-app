import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, ExerciseResponse, NewExercise } from '../../shared/models/exercise.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Routine, RoutineResponse } from '../../shared/models/routine.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/api';
  private exercises: Exercise[] = [];
  private exercisesUpdated = new Subject<Exercise[]>();
  private routines: Routine[] = [];
  private routinesUpdated = new Subject<Routine[]>();

  constructor(private http: HttpClient) { }

  getexerciseUpdateListener() {
    return this.exercisesUpdated.asObservable();
  }

  getRoutineUpdateListener() {
    return this.routinesUpdated.asObservable();
  }

  getAllExercises() { // TODO: Is this getMyExercises?
    const endpoint = `${this.baseUrl}/exercises`
    this.http.get<{message: string, status: number, count: number, data: ExerciseResponse[]}>(endpoint)
      .subscribe((response) => {
      const message = response.message; // TODO: Add snackbar/popup
      const exercises: Exercise[] = response.data.map<Exercise>(e => {
        return {
          id : e._id,
          name: e.name,
          sets: e.sets,
          reps: e.reps,
          weight: e.weight,
          createdAt: e.created_at,
          updatedAt: e.updated_at
        }
      });
      this.exercises = exercises;
      this.exercisesUpdated.next(
        [...this.exercises]
      );
    });
  }

  addExercise(newExercise: NewExercise) {
    const endpoint = `${this.baseUrl}/exercises`

    console.log(newExercise);
    this.http.post<{message: string, status: number, data: ExerciseResponse}>(endpoint, newExercise)
    .subscribe(response => {
      const message = response.message; // TODO: Add snackbar/popup
      const createdExercise = response.data;
      console.log(response);
    });
  }

  getAllRoutines() { // TODO: Is this getMyRoutines?
    const endpoint = `${this.baseUrl}/routines`
    this.http.get<{message: string, status: number, count: number, data: RoutineResponse[]}>(endpoint)
      .subscribe((response) => {
      const message = response.message; // TODO: Add snackbar/popup
      const routines: Routine[] = response.data.map<Routine>(r => {
        return {
          id : r._id,
          name: r.name,
          exercises: r.exercises.map(e => {
            return {
              id: e._id,
              name: e.name,
              sets: e.sets,
              reps: e.reps,
              weight: e.weight,
              createdAt: e.created_at,
              updatedAt: e.updated_at
            } as Exercise // TODO: Why did this work?
          }),
          creator: r.creator,
          createdAt: r.created_at,
          updatedAt: r.updated_at
        }
      });
      this.routines = routines;
      this.routinesUpdated.next(
        [...this.routines]
      );
    });
  }
}

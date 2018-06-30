import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, ExerciseResponse } from '../../shared/models/exercise.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/api';
  private exercises: Exercise[] = [];
  private exercisesUpdated = new Subject<Exercise[]>();

  constructor(private http: HttpClient) { }

  getexerciseUpdateListener() {
    return this.exercisesUpdated.asObservable();
  }

  getAllExercises() {
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
}

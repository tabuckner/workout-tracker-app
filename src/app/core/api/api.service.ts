import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, ExerciseResponse, NewExercise } from '../../shared/models/exercise.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Routine, RoutineResponse, NewRoutine } from '../../shared/models/routine.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/api';
  private exercises: Exercise[] = [];
  private exercisesUpdated = new Subject<Exercise[]>();
  private routines: Routine[] = [];
  private routinesUpdated = new Subject<Routine[]>();

  constructor(
    private http: HttpClient,
    private snacks: MatSnackBar,
    private router: Router
  ) { }

  getexerciseUpdateListener() {
    return this.exercisesUpdated.asObservable();
  }

  getRoutineUpdateListener() {
    return this.routinesUpdated.asObservable();
  }

  getAllExercises(showDialog = true) { // TODO: Is this getMyExercises?
    const endpoint = `${this.baseUrl}/exercises`
    this.http.get<{ message: string, status: number, count: number, data: ExerciseResponse[] }>(endpoint)
      .subscribe((response) => {
        if (showDialog) {
          const message = response.message;
          this.showDialog(message); // FIXME: Queue these to avoid change errors?
        }
        const exercises: Exercise[] = response.data.map<Exercise>(e => {
          return {
            id: e._id,
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
      }, err => {
        const error = err.error.message;
        this.showDialog(error);
      });
  }

  getExercise(id: string) {
    const endpoint = `${this.baseUrl}/exercises/${id}`;

    return this.http.get<{ message: string, status: number, data: ExerciseResponse }>(endpoint);
  }

  addExercise(newExercise: NewExercise) {
    const endpoint = `${this.baseUrl}/exercises`

    console.log(newExercise);
    this.http.post<{ message: string, status: number, data: ExerciseResponse }>(endpoint, newExercise)
      .subscribe(response => {
        const message = response.message;
        this.showDialog(message);
        const createdExercise = response.data;
        console.log(response);
        this.router.navigate(['/exercises']);
      }, err => {
        const error = err.error.message;
        this.showDialog(error);
      });
  }

  updateExercise(id: string, newExercise: NewExercise) {
    const endpoint = `${this.baseUrl}/exercises/${id}`;
    this.http.put<{ message: string, status: number, data: ExerciseResponse }>(endpoint, newExercise)
      .subscribe(response => {
        const message = response.message;
        this.showDialog(message);
        this.router.navigate(['/exercises']);
      }, err => {
        const error = err.error.message;
        this.showDialog(error);
      });
  }

  deleteExercise(id: string) {
    const endpoint = `${this.baseUrl}/exercises/${id}`;

    this.http.delete<{ message: string, status: number, data: any }>(endpoint)
      .subscribe(response => {
        const message = response.message;
        this.showDialog(message);
        this.getAllExercises(false)
        console.log(response);
      });
  }

  getAllRoutines(showDialog = true) { // TODO: Is this getMyRoutines?
    const endpoint = `${this.baseUrl}/routines`
    this.http.get<{ message: string, status: number, count: number, data: RoutineResponse[] }>(endpoint)
      .subscribe((response) => {
        if (showDialog) {
          const message = response.message;
          this.showDialog(message);
        }
        const routines: Routine[] = response.data.map<Routine>(r => {
          return {
            id: r._id,
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
      }, err => {
        console.log(err);
        console.error(new Error(err))
      });
  }

  getRoutine(id: string) {
    const endpoint = `${this.baseUrl}/routines/${id}`;
    return this.http.get<{ message: string, status: number, data: RoutineResponse }>(endpoint);
  }

  addRoutine(newRoutine: NewRoutine) {
    const endpoint = `${this.baseUrl}/routines`

    this.http.post<{ message: string, status: number, data: ExerciseResponse }>(endpoint, newRoutine)
      .subscribe(response => {
        const message = response.message;
        this.showDialog(message);
        const createdExercise = response.data;
        this.router.navigate(['/routines']);
      }, err => {
        const error = err.error.message;
        this.showDialog(error);
      });
  }

  updateRoutine(id: string, newRoutine: NewRoutine) {
    const endpoint = `${this.baseUrl}/routines/${id}`;
    this.http.put<{ message: string, status: number, data: RoutineResponse }>(endpoint, newRoutine)
      .subscribe(response => {
        const message = response.message;
        this.showDialog(message);
        this.router.navigate(['/routines']);
      }, err => {
        console.error(err);
      });
  }

  deleteRoutine(id: string) {
    const endpoint = `${this.baseUrl}/routines/${id}`;
    this.http.delete<{ message: string, status: number, data: any }>(endpoint)
      .subscribe(response => {
        const message = response.message;
        this.showDialog(message);
        this.getAllRoutines(false)
        console.log(response);
      });
  }

  private showDialog(message: string) { // TODO: Add an error snack that is styled differently.
    this.snacks.open(message, 'Dismiss', { duration: 1500 });
  }
}

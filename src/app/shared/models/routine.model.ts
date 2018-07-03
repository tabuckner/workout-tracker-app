import { ExerciseResponse, Exercise } from "./exercise.model";

export class RoutineResponse {
  _id: string;
  name: string;
  exercises: ExerciseResponse[];
  creator: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export class Routine {
  id: string;
  name: string;
  exercises: Exercise[];
  creator: string;
  createdAt?: string;
  updatedAt?: string;
  v?: number;
}

export class NewRoutine {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

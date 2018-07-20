import { Routine } from "./routine.model";
import { Exercise } from "./exercise.model";

export class ExercisePerformancesResponse {
  _id: string;
  exercise: {
    _id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
  };
  performance: [
    {
      _id: string;
      set: number;
      reps: number;
      weight: number;
    }
  ]
}

export class JournalEntryResponse {
  _id: string;
  baseRoutine: {
    _id: string;
    name: string;
  };
  exercisePerformances: ExercisePerformancesResponse[];
  creator: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export class ExercisePerformance {
  id: string;
  exercise: Exercise;
  performance: [ // TODO: Fix this
    {
      id: string;
      set: number; // Optional?
      reps: number; // Optional?
      weight: number; // Optional?
    }
  ]
}

export class JournalEntry {
  id: string;
  name: string;
  baseRoutine: {
    id: string;
    name: string;
  };
  exercisePerformances: ExercisePerformance[];
  creator: string;
  createdAt?: string;
  updatedAt?: string;
  v?: number;
}

export class NewSetPerformance {
  set: number;
  reps: number;
  weight: number;
}

export class NewExercisePerformance {
  exercise: string; // Exercise ID
  performance: NewSetPerformance[];
}

export class NewJournalEntry {
  baseRoutine: string;
  exercisePerformances: NewExercisePerformance[];
}

export class CreatedJournalEntryResponse {
  _id: string;
  baseRoutine: string;
  exercisePerformances: ExercisePerformancesResponse[];
  creator: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

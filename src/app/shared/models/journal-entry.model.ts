import { Routine } from "./routine.model";
import { Exercise } from "./exercise.model";

export class ExercisePerformancesResponse {
  _id: string;
  exercise: string;
  performance: {
    sets: number;
    reps: number;
    weight: number;
  }
}

export class JournalEntryResponse {
  _id: string;
  baseRoutine: {
    _id: string;
    name: string;
  }
  exercisePerformances: ExercisePerformancesResponse[];
  creator: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export class ExercisePerformance {
  id: string;
  exercise: Exercise;
  performance: {
    sets: number; // Optional?
    reps: number; // Optional?
    weight: number; // Optional?
  }
}

export class JournalEntry {
  id: string;
  name: string;
  baseRoutine: Routine;
  exercisePerformances: ExercisePerformance[];
  creator: string;
  createdAt?: string;
  updatedAt?: string;
  v?: number;
}

export class NewJournalEntry {
  // name: string;
  // exercises: string[]; // Array of IDs
}

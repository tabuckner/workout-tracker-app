export class ExerciseResponse {
  _id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export class Exercise { // TODO: Is this really necessary
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  createdAt?: string;
  updatedAt?: string;
  v?: number;
}

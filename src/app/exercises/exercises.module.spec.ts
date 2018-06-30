import { ExercisesModule } from './exercises.module';

describe('ExercisesModule', () => {
  let exercisesModule: ExercisesModule;

  beforeEach(() => {
    exercisesModule = new ExercisesModule();
  });

  it('should create an instance', () => {
    expect(exercisesModule).toBeTruthy();
  });
});

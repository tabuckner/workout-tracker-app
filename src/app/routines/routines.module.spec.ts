import { RoutinesModule } from './routines.module';

describe('RoutinesModule', () => {
  let routinesModule: RoutinesModule;

  beforeEach(() => {
    routinesModule = new RoutinesModule();
  });

  it('should create an instance', () => {
    expect(routinesModule).toBeTruthy();
  });
});

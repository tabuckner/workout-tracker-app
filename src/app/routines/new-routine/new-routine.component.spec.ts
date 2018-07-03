import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoutineComponent } from './new-routine.component';

describe('NewRoutineComponent', () => {
  let component: NewRoutineComponent;
  let fixture: ComponentFixture<NewRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

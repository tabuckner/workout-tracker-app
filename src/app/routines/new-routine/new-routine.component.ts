import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { Exercise } from '../../shared/models/exercise.model';
import { Subscription } from 'rxjs';
import { MatSelectionList } from '@angular/material';
import { NewRoutine } from '../../shared/models/routine.model';

@Component({
  selector: 'app-new-routine',
  templateUrl: './new-routine.component.html',
  styleUrls: ['./new-routine.component.scss']
})
export class NewRoutineComponent implements OnInit {
  @ViewChild('exerciseSelections') choices: MatSelectionList;
  public isLoading: boolean = false;
  public form: FormGroup;
  public mode: string = 'create';
  public exercises: Exercise[] = [];
  public exerciseSub: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadExercises();
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'exercises': new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    if (this.mode === 'create') {
      const newRoutine: NewRoutine = {
        name: this.form.value.name,
        exercises: this.choices.selectedOptions.selected.map(e => e.value)
      };
      console.log(newRoutine);
      this.api.addRoutine(newRoutine); // FIXME: Endpoint Method does not work. Need to add interceptor to add auth token to all protected endpoints.
    }
  }

  loadExercises() {
    this.isLoading = true;
    this.api.getAllExercises();
    this.exerciseSub = this.api.getexerciseUpdateListener()
      .subscribe((fetchedExercises: Exercise[]) => {
        this.isLoading = false;
        this.exercises = fetchedExercises;
        console.log(this.exercises);
      })
  }

}

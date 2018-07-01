import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { NewExercise } from '../../shared/models/exercise.model';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  public form: FormGroup;
  public mode: string = 'create';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'sets': new FormControl(null, { validators: [Validators.required] }),
      'reps': new FormControl(null, { validators: [Validators.required] }),
      'weight': new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invali');
      return;
    }
    if (this.mode === 'create') {
      const newExercise: NewExercise = {
        name: this.form.value.name,
        sets: this.form.value.sets,
        reps: this.form.value.reps,
        weight: this.form.value.weight,
      };
      console.log(newExercise);
      this.api.addExercise(newExercise);
    }
  }

}

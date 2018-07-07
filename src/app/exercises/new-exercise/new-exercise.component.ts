import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { NewExercise, Exercise } from '../../shared/models/exercise.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  public isLoading = false;
  public form: FormGroup;
  public mode: string = 'create';
  public activeExerciseId: string;
  public activeExercise: Exercise;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeBlankForm();
    this.getModeAndInfo();
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid'); // TODO: Add better UI for this.
      return;
    }
    const newExercise: NewExercise = {
      name: this.form.value.name,
      sets: this.form.value.sets,
      reps: this.form.value.reps,
      weight: this.form.value.weight,
    };
    if (this.mode === 'create') {
      console.log(newExercise);
      this.api.addExercise(newExercise);
    }
    if (this.mode === 'edit') {
      console.log(newExercise);
      this.api.updateExercise(this.activeExerciseId, newExercise);
    }
  }

  initializeBlankForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'sets': new FormControl(null, { validators: [Validators.required] }),
      'reps': new FormControl(null, { validators: [Validators.required] }),
      'weight': new FormControl(null, { validators: [Validators.required] }),
    });
  }

  getModeAndInfo() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.activeExerciseId = paramMap.get('id');
        this.isLoading = true;
        this.api.getExercise(this.activeExerciseId).subscribe(response => {
          const fetchedExercise = response.data;
          this.activeExercise = {
            id: fetchedExercise._id,
            name: fetchedExercise.name,
            sets: fetchedExercise.sets,
            reps: fetchedExercise.reps,
            weight: fetchedExercise.weight,
            createdAt: fetchedExercise.created_at,
            updatedAt: fetchedExercise.updated_at,
          };
          this.form.setValue({
            name: this.activeExercise.name,
            sets: this.activeExercise.sets,
            reps: this.activeExercise.reps,
            weight: this.activeExercise.weight
          });
        });
      } else {
        this.mode = 'create';
        this.activeExerciseId = null;
      }
    });
  }

}

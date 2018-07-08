import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { Exercise } from '../../shared/models/exercise.model';
import { Subscription } from 'rxjs';
import { MatSelectionList } from '@angular/material';
import { NewRoutine, Routine } from '../../shared/models/routine.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-routine',
  templateUrl: './new-routine.component.html',
  styleUrls: ['./new-routine.component.scss']
})
export class NewRoutineComponent implements OnInit {
  @ViewChild('exerciseSelections') choices: MatSelectionList;
  public isLoading: boolean = false;
  public form: FormGroup;
  public mode: string;
  public activeRoutineId: string;
  public activeRoutine: Routine;
  public exercises: Exercise[] = [];
  public exerciseSub: Subscription;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadExercises();
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'exercises': new FormControl(null, { validators: [Validators.required] })
    });
    this.getModeAndInfo();
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    const newRoutine: NewRoutine = {
      name: this.form.value.name,
      exercises: this.choices.selectedOptions.selected.map(e => e.value)
    };
    if (this.mode === 'create') {
      this.api.addRoutine(newRoutine);
    }
    if (this.mode === 'edit') {
      this.api.updateRoutine(this.activeRoutineId, newRoutine);
    }
  }

  loadExercises() {
    this.isLoading = true;
    this.api.getAllExercises();
    this.exerciseSub = this.api.getexerciseUpdateListener()
      .subscribe((fetchedExercises: Exercise[]) => {
        this.isLoading = false;
        this.exercises = fetchedExercises;
      })
  }

  private getModeAndInfo() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.activeRoutineId = paramMap.get('id');
        this.isLoading = true;
        this.getRoutineInfo();
      } else {
        this.mode = 'create';
        this.activeRoutineId = null;
      }
    });
  }

  private getRoutineInfo() {
    this.api.getRoutine(this.activeRoutineId).subscribe((response) => {
      this.isLoading = false;
      const fetchedRoutine = response.data;
      this.activeRoutine = {
        id: fetchedRoutine._id,
        name: fetchedRoutine.name,
        exercises: fetchedRoutine.exercises.map(e => {
          return {
            id: e._id,
            name: e.name,
            sets: e.sets,
            reps: e.reps,
            weight: e.weight,
            createdAt: e.created_at,
            updatedAt: e.updated_at
          } as Exercise
        }),
        creator: fetchedRoutine.creator,
        createdAt: fetchedRoutine.created_at,
        updatedAt: fetchedRoutine.updated_at
      };
      this.form.setValue({
        name: this.activeRoutine.name,
        exercises: null
      });
      this.preselectExercises();
    });
  }

  private preselectExercises() {
    this.choices.options.map(choice => {
      const activeRoutineIds = this.activeRoutine.exercises.map(e => e.id);
      if (activeRoutineIds.includes(choice.value)) {
        choice.selected = true;
      }
    });
  }

}

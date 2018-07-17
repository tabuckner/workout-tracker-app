import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Routine } from '../../shared/models/routine.model';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
  selector: 'app-new-journal-entry',
  templateUrl: './new-journal-entry.component.html',
  styleUrls: ['./new-journal-entry.component.scss']
})
export class NewJournalEntryComponent implements OnInit {
  public isLoading = false;
  public form: FormGroup;
  public mode: string = 'create';
  public activeRoutineId: string;
  public activeRoutine: Routine;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeBlankForm();
    this.getModeAndInfo();
  }

  initializeBlankForm() {
    this.form = new FormGroup({
      // 'name': new FormControl(null, { validators: [Validators.required] }),
      // 'sets': new FormControl(null, { validators: [Validators.required] }),
      // 'reps': new FormControl(null, { validators: [Validators.required] }),
      // 'weight': new FormControl(null, { validators: [Validators.required] }),
    });
  }

  prepopulateForm() {
    if (this.activeRoutine) {
      for (let exercise of this.activeRoutine.exercises) {
        for (let i = 0; i < exercise.sets; i++) {
          const name = `${exercise.id}-set-${i + 1}`;
          this.form.addControl(`${name}-reps`, new FormControl(exercise.reps, Validators.required))
          this.form.addControl(`${name}-weight`, new FormControl(exercise.weight, Validators.required))
        }
      }
    }
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
      console.log('Active Routine', this.activeRoutine);
      this.prepopulateForm();
    });
  }

}

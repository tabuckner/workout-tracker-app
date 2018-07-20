import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { Routine } from '../../shared/models/routine.model';
import { Exercise } from '../../shared/models/exercise.model';
import { NewJournalEntry, NewExercisePerformance, NewSetPerformance } from '../../shared/models/journal-entry.model';
import { empty } from 'rxjs';

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
    this.form = new FormGroup({});
  }

  prepopulateForm() {
    if (this.activeRoutine) {
      for (let exercise of this.activeRoutine.exercises) {
        for (let i = 0; i < exercise.sets; i++) {
          const name = `${exercise.id}-${i + 1}`;
          this.form.addControl(`${name}-reps`, new FormControl(exercise.reps, Validators.required))
          this.form.addControl(`${name}-weight`, new FormControl(exercise.weight, Validators.required))
        }
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    const emptyJournalEntry = this.getBlankJournalEntry();
    const newJournalEntry = this.getFilledJournalEntry(emptyJournalEntry);
    if (this.mode === 'create') {
      this.api.addJournalEntry(newJournalEntry);
    }
    if (this.mode === 'edit') {
      console.warn('Edit Mode Requested, API Does not yet support this.');
      // this.api.updateRoutine(this.activeRoutineId, newRoutine);
    }
  }

  private getModeAndInfo() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        // this.mode = 'edit'; // FIXME: Edit mode only if there is a Journal Entry ID.
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

  private getBlankJournalEntry(): NewJournalEntry {
    let blankJournalEntry: NewJournalEntry = { baseRoutine: this.activeRoutineId, exercisePerformances: [] };
    for (let exercise of this.activeRoutine.exercises) {
      const blankPerformance: NewExercisePerformance = { exercise: exercise.id, performance: [] };
      for (let i = 0; i < exercise.sets; i++) {
        const setPerformance = new NewSetPerformance();
        setPerformance.set = i + 1;
        blankPerformance.performance.push(setPerformance);
      }
      blankJournalEntry.exercisePerformances.push(blankPerformance);
    }
    return blankJournalEntry;
  }

  private getFilledJournalEntry(emptyJournalEntry: NewJournalEntry): NewJournalEntry {
    const filledJournalEntry: NewJournalEntry = JSON.parse(JSON.stringify(emptyJournalEntry))

    for (let formValue in this.form.value) {
      const parsedFormValue = formValue.split('-');
      const exerciseId = parsedFormValue[0];
      const exerciseSetNumber = +parsedFormValue[1];
      const exerciseKey = parsedFormValue[2];
      const exerciseValue = this.form.value[formValue];

      const matchedExercise = filledJournalEntry.exercisePerformances.find(ep => ep.exercise === exerciseId);
      const matchedSet = matchedExercise.performance.find(setPerformance => setPerformance.set === exerciseSetNumber)

      if (matchedExercise && matchedSet) {
        if (exerciseKey === 'reps') {
          matchedSet.reps = exerciseValue;
        }
        if (exerciseKey === 'weight') {
          matchedSet.weight = exerciseValue;
        }
      }
    }
    console.log(filledJournalEntry);
    return filledJournalEntry;
  }

}

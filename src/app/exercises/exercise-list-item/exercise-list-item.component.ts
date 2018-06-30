import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent implements OnInit {
  @Input() exercise: Exercise;
  description: string = 'Define a Desc';
  icon: string = 'help';

  constructor() { }

  ngOnInit() {
  }

}
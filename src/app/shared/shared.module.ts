import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatExpansionModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MatStepperModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TimesPipe } from './pipes/times.pipe';
import { TimerComponent } from './timer/timer.component';
import { MinuteSecondsPipe } from './pipes/seconds.pipe';
import { TimerDialogComponent } from './timer/timer-dialog/timer-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatStepperModule
  ],
  exports: [
    ConfirmDialogComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatStepperModule,
    TimesPipe

  ],
  declarations: [
    ConfirmDialogComponent,
    TimesPipe,
    MinuteSecondsPipe,
    TimerComponent,
    TimerDialogComponent
  ],
})
export class SharedModule { }

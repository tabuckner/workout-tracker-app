import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatExpansionModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatSnackBarModule
  ],
  exports: [
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
    MatSnackBarModule

  ],
})
export class SharedModule { }

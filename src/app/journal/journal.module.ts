import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewJournalEntryComponent } from './new-journal-entry/new-journal-entry.component';
import { JournalEntryListComponent } from './journal-entry-list/journal-entry-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    NewJournalEntryComponent,
    JournalEntryListComponent,
  ],
  exports: [
    NewJournalEntryComponent,
    JournalEntryListComponent,
  ]
})
export class JournalModule { }

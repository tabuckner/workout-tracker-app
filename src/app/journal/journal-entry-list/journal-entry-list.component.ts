import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../core/header/header.service';
import { ApiService } from '../../core/api/api.service';
import { Subscription } from 'rxjs';
import { JournalEntry } from '../../shared/models/journal-entry.model';

@Component({
  selector: 'app-journal-entry-list',
  templateUrl: './journal-entry-list.component.html',
  styleUrls: ['./journal-entry-list.component.scss']
})
export class JournalEntryListComponent implements OnInit {
  isLoading = false;
  journalEntries: JournalEntry[] = [];
  journalEntriesSub: Subscription;

  constructor(
    private header: HeaderService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.header.setHeaderTitle({ title: 'My Journal' });
    this.header.setShowCreateNew({ show: true, which: 'journal' });
    this.loadJournalEntries();
  }

  loadJournalEntries() {
    this.isLoading = true;
    this.api.getAllJournalEntries();
    this.journalEntriesSub = this.api.getJournalEntryUpdateListener()
      .subscribe((fetchedJournalEntries: JournalEntry[]) => {
        this.isLoading = false;
        this.journalEntries = fetchedJournalEntries;
        console.log(this.journalEntries);
      });
  }

  onDeleteJournalEntry(id: string) {
    console.warn(`You've requested to delete ${id}`);
  }

}

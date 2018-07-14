import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryListComponent } from './journal-entry-list.component';

describe('JournalEntryListComponent', () => {
  let component: JournalEntryListComponent;
  let fixture: ComponentFixture<JournalEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

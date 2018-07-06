import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../core/header/header.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  greeting: string = 'Workout Tracker';
  lastJournalEntry: string = 'Unknown';
  qod: {quote: string, author?: string} = {quote: 'Tap the menu above to get started. Track your progression with Journal Entries of your routines!'}
  imgBusy = false;

  constructor(
    private header: HeaderService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.header.setHeaderTitle({default: true});
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.http.get<any>('https://random-quote-generator.herokuapp.com/api/quotes/random')
    .subscribe(res => {
        this.qod.quote = res.quote;
        this.qod.author = res.author;
    }, err => {
      if (err.status === 429) {
        return;
      }
    });
  }

}

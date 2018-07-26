import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  // @Input() public restPeriod: number = 1.5 * 60; // Seconds
  @Input() public restPeriod: number = .15 * 60; // Seconds
  public now: number;
  public then: number;
  public interval;
  public timeRemaining;
  public timerProgress: number = 0;
  public restExceeded: boolean = false;

  constructor() { }

  ngOnInit() {
    this.initializeTimes();
    this.startTimer();
  }

  startTimer() {
    this.timeRemaining = this.restPeriod;
    this.interval = setInterval(() => {
      const localNow = Date.now();
      this.timeRemaining = this.toSec(this.then - localNow);
      this.setProgress();
      this.timeRemaining < 0 ? this.restExceeded = true : this.restExceeded = false;
    }, 1000);
  }

  initializeTimes() {
    this.now = Date.now();
    this.then = this.now + (this.restPeriod * 1000);
  }

  private setProgress() {
    if (!this.restExceeded) {
      this.timerProgress = ((this.timeRemaining / this.restPeriod * 100) - 100) * -1;
    }
    console.log(this.timerProgress);
  }

  private toSec(milliseconds): number {
    return Math.round(milliseconds / 1000);
  }

}

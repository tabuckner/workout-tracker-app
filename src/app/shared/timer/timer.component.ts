import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() public restPeriod: number = 1.5 * 60; // Seconds
  // @Input() public restPeriod: number = 30; // Seconds
  public isRunning = false;
  public now: number;
  public then: number;
  public interval;
  public timeRemaining = 0;
  public displayTime;
  public timerProgress: number = 0;
  public extraRest: number = 0;
  public restExceeded: boolean = false;

  ngOnInit() {
    this.timeRemaining = this.restPeriod;
  }

  startTimer() {
    this.initializeTimes();
    this.isRunning = true;
    this.timeRemaining = this.restPeriod;
    this.setDisplayTime(this.timeRemaining);
    this.interval = setInterval(() => {
      const localNow = Date.now();
      this.timeRemaining = this.toSec(this.then - localNow);
      this.setProgress();
      this.timeRemaining <= 0 ? this.restExceeded = true : this.restExceeded = false;
    }, 1000);
  }

  resetTimer() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.timerProgress = 0;
    this.extraRest = 0;
    this.restExceeded = false;
    this.timeRemaining = this.restPeriod
    this.setDisplayTime(this.timeRemaining);
  }

  initializeTimes() {
    this.now = Date.now();
    this.then = this.now + (this.restPeriod * 1000);
  }

  private setProgress() {
    if (!this.restExceeded) {
      this.timerProgress = ((this.timeRemaining / this.restPeriod * 100) - 100) * -1;
      this.setDisplayTime(this.timeRemaining);
    } else if (this.restExceeded) {
      this.extraRest = (((this.timeRemaining / this.restPeriod * 100) - 100) * -1) - 100;
      this.setDisplayTime(this.timeRemaining);
    }
  }

  private setDisplayTime(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    this.displayTime = date.toISOString();
  }

  private toSec(milliseconds): number {
    return Math.round(milliseconds / 1000);
  }

}

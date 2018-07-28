import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    let prefix;
    value >= 0 ? prefix = '' : prefix = '-';
    value = Math.abs(value);
    const minutes: number = Math.floor(value / 60);
    let seconds = (value - minutes * 60).toString()
    value - minutes < 10 && value - minutes >= 0 ? seconds = `${0}${seconds}` : seconds = seconds;
    return prefix + minutes + ':' + seconds;
  }

}

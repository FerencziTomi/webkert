import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date): unknown {
    if(!value){
      return 'Nem ismert';
    }
    
    const year = new Date(value).getFullYear();
    const month = new Date(value).getMonth() + 1;
    const day = String(new Date(value).getDate()).padStart(2, '0');

    let date;

    switch(month){
      case 1: {
        date = year + ". Január " + day + ".";
        break;
      }
      case 2: {
        date = year + ". Február " + day + ".";
        break;
      }
      case 3: {
        date = year + ". Március " + day + ".";
        break;
      }
      case 4: {
        date = year + ". Április " + day + ".";
        break;
      }
      case 5: {
        date = year + ". Május " + day + ".";
        break;
      }
      case 6: {
        date = year + ". Június " + day + ".";
        break;
      }
      case 7: {
        date = year + ". Július " + day + ".";
        break;
      }
      case 8: {
        date = year + ". Augusztus " + day + ".";
        break;
      }
      case 9: {
        date = year + ". Szeptember " + day + ".";
        break;
      }
      case 10: {
        date = year + ". Október " + day + ".";
        break;
      }
      case 11: {
        date = year + ". November " + day + ".";
        break;
      }
      default: {
        date = year + ". December " + day + ".";
        break;
      }
    }
    return date;
  }

}

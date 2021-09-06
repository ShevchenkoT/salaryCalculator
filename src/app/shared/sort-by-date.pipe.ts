import { Pipe, PipeTransform } from '@angular/core';
import { mainData } from './interfaces';
@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  // transform(mainData: Array<mainData>): Array<mainData> {
  //   return mainData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // }
  transform(mainData: Array<mainData>): Array<mainData> {
    if (mainData) {
      return mainData.reverse()
    }
    return mainData
  }
}

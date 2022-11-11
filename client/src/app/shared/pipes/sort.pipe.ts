import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, propName: string, order: string): any {
    if(value.length === 0 || order === '' || propName === ''){
      return value;
    }
    let sortArr = [...value]
    if(order === 'asc'){
      return sortArr.sort((a, b) => a[propName] > b[propName] ? 1 : -1)
    } else {
      return sortArr.sort((a, b) => a[propName] < b[propName] ? 1 : -1)
    }
  }

}

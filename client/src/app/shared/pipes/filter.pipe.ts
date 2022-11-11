import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: any): any {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    let resArr = [];
    for(const item of value){
      if(item[propName].toLowerCase().includes(filterString.toLowerCase())){
        resArr.push(item);
      }
    }
    return resArr;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[]|null, key: string, gender:string): any[]|null {
    if (!Array.isArray(value) || !key) {
      return value;
    }

    if (key === "liked" || key === "accepted") {
      return value
        .filter(item => (item[key]));
    } else if (key === "interests") {
      return value
        .filter(item => (item[key]) === "Angular" );
    } else if (key === "location") {
      return value
        .filter(item => (item[key]) === "Budapest");
    }else if(key === "gender") {
      return value
        .filter(item => (item[key]) === gender);
    }

  };

}

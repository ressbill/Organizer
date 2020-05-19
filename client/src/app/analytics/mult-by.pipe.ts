import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
  name: 'multiplyBy'
})
export class MultByPipe implements PipeTransform{
  transform(num: number, multiplier: number): number {
    return num * multiplier
  }

}

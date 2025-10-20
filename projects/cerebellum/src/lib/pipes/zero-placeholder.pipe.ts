import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPlaceholder'
})
export class ZeroPlaceholderPipe implements PipeTransform {
  transform(value: number | null | undefined): string | number {
    return value ? value : '---';
  }
}

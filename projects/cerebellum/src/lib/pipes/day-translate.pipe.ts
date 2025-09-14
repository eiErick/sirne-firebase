import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayTranslatePipe'
})
export class DayTranslatePipe implements PipeTransform {
  private daysMap: Record<string, string> = {
    mon: 'SEGUNDA',
    tue: 'TERÇA',
    wed: 'QUARTA',
    thu: 'QUINTA',
    fri: 'SEXTA',
    sat: 'SÁBADA',
    sun: 'DOMINGO'
  };

  transform(value: string): string {
    if (!value) return '';
    const key = value.toLowerCase();
    return this.daysMap[key] ?? value;
  }
}

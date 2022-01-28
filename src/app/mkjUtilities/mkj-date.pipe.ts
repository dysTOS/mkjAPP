import { DatePipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mkjDate'
})
@Injectable()
export class MkjDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) { }

    transform(date: string): string {
        if (date) {
            date = date.replace(' ', 'T');
            return this.datePipe.transform(date, "E d. MMMM YYYY hh:mm");
        }
        else return '';
    }

}

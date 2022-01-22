import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'mkjDate'
})
@Injectable()
export class MkjDatePipe implements PipeTransform {

    transform(date: any, format: string): any {
        if (date) {
            return moment(date).format("YYYY-MM-DD");
        }
    }

}

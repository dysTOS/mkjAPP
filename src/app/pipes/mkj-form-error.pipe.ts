import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Message } from 'primeng/api';

@Pipe({
  name: 'mkjFormError',
})
export class MkjFormErrorPipe implements PipeTransform {
  public transform(value: ValidationErrors, ...args: unknown[]): Message[] {
    if (!value) {
      return [];
    }

    return Object.entries(value).map(([key, error]) => {
      return {
        severity: 'warn',
        summary: key,
        detail: error,
        closable: false,
      };
    });
  }
}

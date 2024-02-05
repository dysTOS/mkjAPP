import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public errors: Error[] = [];

  constructor() {}

  public error(error: Error): void {
    this.errors.push(error);
  }
}

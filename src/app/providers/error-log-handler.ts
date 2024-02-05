import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class ErrorLogHandler extends ErrorHandler {
  constructor(private loggerService: LoggerService) {
    super();
  }

  public handleError(error: any): void {
    this.loggerService.error(error);
    super.handleError(error);
  }
}

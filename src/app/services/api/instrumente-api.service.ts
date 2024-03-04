import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instrument } from 'src/app/models/Instrument';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';

@Injectable({
  providedIn: 'root',
})
export class InstrumenteApiService extends AbstractCrudApiService<Instrument> {
  protected controllerApiUrlKey: string = 'instrumente';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}

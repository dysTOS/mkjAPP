import { Injectable } from '@angular/core';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';
import { Kassabuchung } from 'src/app/models/Kassabuch';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KassabuchungenApiService extends AbstractCrudApiService<Kassabuchung> {
  protected controllerApiUrlKey: string = 'kassabuchung';

  constructor(http: HttpClient) {
    super(http);
  }
}

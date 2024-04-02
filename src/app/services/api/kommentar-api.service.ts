import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kommentar } from 'src/app/models/Kommentar';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';

@Injectable({
  providedIn: 'root',
})
export class KommentarApiService extends AbstractCrudApiService<Kommentar> {
  protected controllerApiUrlKey = 'kommentare';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}

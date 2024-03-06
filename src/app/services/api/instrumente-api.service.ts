import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instrument } from 'src/app/models/Instrument';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstrumenteApiService extends AbstractCrudApiService<Instrument> {
  protected readonly controllerApiUrlKey: string = 'instrumente';

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public getInstrumenteOfMitglied(mitgliedId: string): Observable<Instrument[]> {
    return this.httpClient.get<Instrument[]>(`${environment.apiUrl}${this.controllerApiUrlKey}/mitglied/${mitgliedId}`);
  }
}

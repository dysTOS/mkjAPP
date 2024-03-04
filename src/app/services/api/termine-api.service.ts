import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardHttpOptions } from 'src/app/interfaces/api-middleware';
import { environment } from '../../../environments/environment';
import { Termin } from '../../models/Termin';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';

@Injectable({
  providedIn: 'root',
})
export class TermineApiService extends AbstractCrudApiService<Termin> {
  protected controllerApiUrlKey: string = 'termine';
  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public getNextTermin(skip?: number): Observable<Termin> {
    const url = this.apiURL + 'nextausrueckung';
    return this.httpClient.post<Termin>(url, { skip: skip }, StandardHttpOptions);
  }

  public saveTerminbyLeiter(termin: Termin): Observable<Termin> {
    const url = this.apiURL + 'saveterminbyleiter';
    return this.httpClient.post<Termin>(url, termin, StandardHttpOptions);
  }
}

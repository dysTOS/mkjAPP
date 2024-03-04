import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GetListOutput, StandardHttpOptions } from 'src/app/interfaces/api-middleware';
import { environment } from 'src/environments/environment';
import { Noten } from '../../models/Noten';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';
import { KeyOf } from 'src/app/types/KeyOf';

@Injectable({
  providedIn: 'root',
})
export class NotenApiService extends AbstractCrudApiService<Noten> {
  protected controllerApiUrlKey: string = 'noten';
  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public getNotenForTermin(terminId: string): Observable<Noten[]> {
    const url = this.apiURL + this.controllerApiUrlKey + '/termin/' + terminId.toString();
    return this.httpClient.get<Noten[]>(url, StandardHttpOptions);
  }

  public searchNoten(searchkey: string): Observable<Noten[]> {
    const url = this.apiURL + this.controllerApiUrlKey + '/search/' + searchkey;
    return this.httpClient.get<Noten[]>(url, StandardHttpOptions);
  }

  public searchFieldValues(
    field: KeyOf<Noten>,
    searchText: string
  ): Observable<GetListOutput<{ label: string; value: string }>> {
    const url = this.apiURL + this.controllerApiUrlKey + '/search/' + field + '/' + searchText;
    return this.httpClient.get<GetListOutput<{ label: string; value: string }>>(url, StandardHttpOptions);
  }

  public attachNotenToAusrueckung(notenId: string, ausrueckungId: string): Observable<any> {
    const url = this.apiURL + this.controllerApiUrlKey + '/attach';
    return this.httpClient.post<any>(url, { noten_id: notenId, ausrueckung_id: ausrueckungId }, StandardHttpOptions);
  }

  public detachNotenFromAusrueckung(notenId: string, ausrueckungId: string): Observable<any> {
    const url = this.apiURL + this.controllerApiUrlKey + '/detach';
    return this.httpClient.post<any>(url, { noten_id: notenId, ausrueckung_id: ausrueckungId }, StandardHttpOptions);
  }
}

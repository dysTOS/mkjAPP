import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardHttpOptions } from 'src/app/interfaces/api-middleware';
import { Mitglied } from 'src/app/models/Mitglied';
import { environment } from 'src/environments/environment';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';

@Injectable({
  providedIn: 'root',
})
export class MitgliederApiService extends AbstractCrudApiService<Mitglied> {
  protected controllerApiUrlKey: string = 'mitglieder';
  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getMitgliederForAusrueckung(ausrueckungId: string): Observable<Mitglied[]> {
    const url = this.apiURL + 'mitgliederausrueckung/' + ausrueckungId.toString();
    return this.httpClient.get<Mitglied[]>(url, StandardHttpOptions);
  }

  searchMitglieder(searchkey: string): Observable<Mitglied[]> {
    const url = this.apiURL + 'mitglieder/search/' + searchkey;
    return this.httpClient.get<Mitglied[]>(url, StandardHttpOptions);
  }

  public getNextGeburtstag(): Observable<Mitglied[]> {
    const url = this.apiURL + 'mitgliedernextgeb';
    return this.httpClient.get<Mitglied[]>(url, StandardHttpOptions);
  }

  updateOwnMitgliedData(mitglied: Mitglied): Observable<Mitglied> {
    const url = this.apiURL + 'mitgliedselbst';
    return this.httpClient.post<any>(url, mitglied, StandardHttpOptions);
  }

  attachMitgliedToAusrueckung(ausrueckungId: string, mitgliedId: string): Observable<any> {
    const url = this.apiURL + 'addmitglied';
    return this.httpClient.post<any>(
      url,
      { mitglied_id: mitgliedId, ausrueckung_id: ausrueckungId },
      StandardHttpOptions
    );
  }

  detachMitgliedFromAusrueckung(ausrueckungId: string, mitgliedId: string): Observable<any> {
    const url = this.apiURL + 'removemitglied';
    return this.httpClient.post<any>(
      url,
      { mitglied_id: mitgliedId, ausrueckung_id: ausrueckungId },
      StandardHttpOptions
    );
  }

  attachMitgliedToGruppe(gruppenId: string, mitgliedId: string): Observable<any> {
    const url = this.apiURL + 'addmitgliedgruppe';
    return this.httpClient.post<any>(url, { mitglied_id: mitgliedId, gruppe_id: gruppenId }, StandardHttpOptions);
  }

  detachMitgliedFromGruppe(gruppenId: string, mitgliedId: string): Observable<any> {
    const url = this.apiURL + 'removemitgliedgruppe';
    return this.httpClient.post<any>(url, { mitglied_id: mitgliedId, gruppe_id: gruppenId }, StandardHttpOptions);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllocationInput, StandardHttpOptions, MessageOutput } from '../../interfaces/api-middleware';
import { Gruppe } from '../../models/Gruppe';
import { Mitglied } from '../../models/Mitglied';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';

@Injectable({
  providedIn: 'root',
})
export class GruppenApiService extends AbstractCrudApiService<Gruppe> {
  protected controllerApiUrlKey: string = 'gruppen';

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public addMitgliedToGruppe(input: AllocationInput): Observable<MessageOutput> {
    const url = environment.apiUrl + this.controllerApiUrlKey + '/addmitglied';
    return this.httpClient.post<MessageOutput>(
      url,
      { gruppe_id: input.collectionId, mitglied_id: input.subjectId },
      StandardHttpOptions
    );
  }

  public removeMitgliedFromGruppe(input: AllocationInput): Observable<MessageOutput> {
    const url = environment.apiUrl + this.controllerApiUrlKey + '/removemitglied';
    return this.httpClient.post<MessageOutput>(
      url,
      { gruppe_id: input.collectionId, mitglied_id: input.subjectId },
      StandardHttpOptions
    );
  }

  public getGruppenLeiter(gruppenId: string): Observable<Mitglied> {
    const url = environment.apiUrl + this.controllerApiUrlKey + '/gruppenleiter';
    return this.httpClient.post<Mitglied>(url, { id: gruppenId }, StandardHttpOptions);
  }

  public getMitgliederOfGruppe(gruppenId: string): Observable<Mitglied[]> {
    const url = environment.apiUrl + this.controllerApiUrlKey + '/mitgliederofgruppe';
    return this.httpClient.post<Mitglied[]>(url, { id: gruppenId }, StandardHttpOptions);
  }

  public getGruppenOfMitglied(mitgliedId: string): Observable<Gruppe[]> {
    const url = environment.apiUrl + this.controllerApiUrlKey + '/gruppenofmitglied';
    return this.httpClient.post<Gruppe[]>(url, { id: mitgliedId }, StandardHttpOptions);
  }
}

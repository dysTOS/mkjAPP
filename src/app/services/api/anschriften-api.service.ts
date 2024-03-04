import { Injectable } from '@angular/core';
import { AbstractCrudApiService } from './_abstract-crud-api-service.class';
import { Anschrift } from 'src/app/models/Anschrift';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnschriftenApiService extends AbstractCrudApiService<Anschrift> {
  protected controllerApiUrlKey: string = 'anschrift';

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public search(searchTerm: string): Observable<Anschrift[]> {
    if (!searchTerm) return of([]);

    const url = environment.apiUrl + this.controllerApiUrlKey + '/search/' + searchTerm;
    return this.httpClient.get<Anschrift[]>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardHttpOptions } from 'src/app/interfaces/api-middleware';
import { Bewertung } from 'src/app/models/Bewertung';
import { Noten } from 'src/app/models/Noten';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BewertungenApiService {
  private apiUrl = environment.apiUrl + 'bewertungen';

  constructor(private http: HttpClient) {}

  public getNotenVote(notenId: string): Observable<Bewertung> {
    return this.http.post<Bewertung>(`${this.apiUrl}/noten/get`, { noten_id: notenId }, StandardHttpOptions);
  }

  public setNotenVote(notenId: string, vote: number): Observable<Noten> {
    return this.http.post<Noten>(
      `${this.apiUrl}/noten/set`,
      { noten_id: notenId, bewertung: vote },
      StandardHttpOptions
    );
  }
}

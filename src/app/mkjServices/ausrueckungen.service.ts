import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ausrueckung } from '../mkjInterfaces/Ausrueckung';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 6|q0L51PF1gX9fnrxBGAq4FRIWkbOHmMX03YQykzJR'
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class AusrueckungenService {
  private apiUrl: 'https://api.gulaschmusi.at/api/';


  constructor(private http: HttpClient) { }

  getAusrueckungen(): Observable<Ausrueckung[]>{
    const url = "https://api.gulaschmusi.at/api/ausrueckungen";
    return this.http.get<Ausrueckung[]>(url, httpOptions);
  }

  createAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung>{
    const url = "https://api.gulaschmusi.at/api/ausrueckungen";
    return this.http.post<Ausrueckung>(url, ausrueckung, httpOptions);
  }

  updateAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung>{
    const url = "https://api.gulaschmusi.at/api/ausrueckungen/" + ausrueckung.id.toString();
    return this.http.put<Ausrueckung>(url, ausrueckung, httpOptions);
  }

  deleteAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung>{
    const url = "https://api.gulaschmusi.at/api/ausrueckungen/" + ausrueckung.id.toString();
    return this.http.delete<Ausrueckung>(url, httpOptions);
  }

}

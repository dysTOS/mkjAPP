import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ausrueckung } from '../mkjInterfaces/Ausrueckung';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 1|PKI8PoNeq2kgW3U6vqHWTZFZifeiNPJDs3Eqwv35'
    }),
  };



@Injectable({
  providedIn: 'root'
})
export class AusrueckungenService {


  constructor(private http: HttpClient) {
  }

  getAusrueckungen(): Observable<Ausrueckung[]>{
    const url = "http://127.0.0.1:8000/api/ausrueckungen";
    return this.http.get<Ausrueckung[]>(url, httpOptions);
  }

  createAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung>{
    const url = "http://127.0.0.1:8000/api/ausrueckungen";
    return this.http.post<Ausrueckung>(url, ausrueckung, httpOptions);
  }

  updateAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung>{
    const url = "http://127.0.0.1:8000/api/ausrueckungen/" + ausrueckung.id.toString();
    return this.http.put<Ausrueckung>(url, ausrueckung, httpOptions);
  }

  deleteAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung>{
    const url = "http://127.0.0.1:8000/api/ausrueckungen/" + ausrueckung.id.toString();
    return this.http.delete<Ausrueckung>(url, httpOptions);
  }

}

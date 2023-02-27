import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardHttpOptions } from 'src/app/interfaces/api-middleware';
import { Instrument } from 'src/app/models/Instrument';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstrumenteApiService {
    private apiURL = environment.apiUrl + 'instrumente';

  constructor(private http: HttpClient) {
   }

   public getInstrumente() :Observable<Instrument>{
    return this.http.get<Instrument>(this.apiURL, StandardHttpOptions);
   }

   public getInstrument(id: string) :Observable<Instrument>{
    return this.http.get<Instrument>(this.apiURL + '/' + id, StandardHttpOptions);
   }

   public saveInstrument(instrument: Instrument) :Observable<Instrument>{
    return this.http.post<Instrument>(this.apiURL, instrument, StandardHttpOptions);
   }

   public deleteInstrument(id: string) :Observable<Instrument>{
    return this.http.delete<Instrument>(this.apiURL + '/' + id, StandardHttpOptions);
   }

   public attachInstrumentToMitglied(instrumentId: string, mitgliedId: string) :Observable<Instrument>{
    return this.http.post<Instrument>(this.apiURL + '/' + instrumentId + '/mitglied/' + mitgliedId, {}, StandardHttpOptions);
   }

   public detachInstrumentFromMitglied(instrumentId: string, mitgliedId: string) :Observable<Instrument>{
    return this.http.delete<Instrument>(this.apiURL + '/' + instrumentId + '/mitglied/' + mitgliedId, StandardHttpOptions);
   }
}

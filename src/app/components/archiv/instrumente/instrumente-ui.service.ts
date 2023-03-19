import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { Instrument } from "src/app/models/Instrument";
import { Mitglied } from "src/app/models/Mitglied";
import { InstrumenteApiService } from "src/app/services/api/instrumente-api.service";
import { InfoService } from "src/app/services/info.service";

@Injectable()
export class InstrumenteUiService {
    private _loading = new BehaviorSubject<boolean>(false);
    public loading = this._loading.asObservable();

    private _saving = new BehaviorSubject<boolean>(false);
    public saving = this._saving.asObservable();

    private _editInstrument: Instrument;
    public set editInstrument(instrument: Instrument) {
        this._editInstrument = instrument;
    }

    constructor(
        private apiService: InstrumenteApiService,
        private infoService: InfoService
    ) {}

    public getAllInstrumente(): Observable<Instrument[]> {
        this._loading.next(true);
        return this.apiService.getInstrumente().pipe(
            tap((e) => this._loading.next(false)),
            catchError((err) => {
                this._loading.next(false);
                this.infoService.error(err);
                return of(null);
            })
        );
    }

    public getInstrument(id: string): Observable<Instrument> {
        if (this._editInstrument?.id === id) return of(this._editInstrument);

        this._loading.next(true);
        return this.apiService.getInstrument(id).pipe(
            tap((e) => this._loading.next(false)),
            catchError((err) => {
                this._loading.next(false);
                this.infoService.error(err);
                return of(null);
            })
        );
    }

    public saveInstrument(instrument: Instrument): Observable<Instrument> {
        this._saving.next(true);
        return this.apiService.saveInstrument(instrument).pipe(
            tap((e) => {
                this._saving.next(false);
                this.infoService.success("Instrument gespeichert.");
            }),
            catchError((err) => {
                this._saving.next(false);
                this.infoService.error(err);
                return of(null);
            })
        );
    }

    public deleteInstrument(instrument: Instrument): Observable<any> {
        this._loading.next(true);
        return this.infoService
            .confirmDelete(
                `Instrument "${instrument.bezeichnung}" wirklich löschen?`,
                () => this.apiService.deleteInstrument(instrument?.id)
            )
            .pipe(
                map((e) => {
                    this._loading.next(false);
                    this.infoService.info("Instrument entfernt.");
                    return of(true);
                }),
                catchError((err) => {
                    this._loading.next(false);
                    this.infoService.error(err);
                    return of(null);
                })
            );
    }

    public attachInstrumentToMitglied(
        instrument: Instrument,
        mitglied: Mitglied
    ) {
        this._loading.next(true);
        return this.apiService
            .attachInstrumentToMitglied(instrument.id, mitglied.id)
            .pipe(
                tap((e) => {
                    this._loading.next(false);
                    this.infoService.success("Instrument zugewiesen");
                }),
                catchError((err) => {
                    this._loading.next(false);
                    this.infoService.error(err);
                    return of(null);
                })
            );
    }

    public detachInstrumentFromMitglied(
        instrument: Instrument,
        mitglied: Mitglied
    ) {
        this._loading.next(true);
        return this.apiService
            .detachInstrumentFromMitglied(instrument.id, mitglied.id)
            .pipe(
                tap((e) => {
                    this._loading.next(false);
                    this.infoService.success("Instrument entfernt");
                }),
                catchError((err) => {
                    this._loading.next(false);
                    this.infoService.error(err);
                    return of(null);
                })
            );
    }
}

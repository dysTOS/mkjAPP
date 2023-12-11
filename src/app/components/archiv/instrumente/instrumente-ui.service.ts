import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { Instrument } from "src/app/models/Instrument";
import { InstrumenteApiService } from "src/app/services/api/instrumente-api.service";
import { InfoService } from "src/app/services/info.service";

@Injectable()
export class InstrumenteUiService {
    private _loading = new BehaviorSubject<boolean>(false);
    public loading = this._loading.asObservable();

    private _saving = new BehaviorSubject<boolean>(false);
    public saving = this._saving.asObservable();

    constructor(
        private apiService: InstrumenteApiService,
        private infoService: InfoService
    ) {}

    public getAllInstrumente(): Observable<Instrument[]> {
        this._loading.next(true);
        return this.apiService.getList(null).pipe(
            tap((e) => this._loading.next(false)),
            map((res) => res.values),
            catchError((err) => {
                this._loading.next(false);
                this.infoService.error(err);
                return of(null);
            })
        );
    }
}

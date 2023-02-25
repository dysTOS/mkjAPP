import { Component, Input, OnInit } from "@angular/core";
import { Termin, TerminTeilnahmeMap } from "src/app/models/Termin";
import { TeilnahmenApiService } from "src/app/services/api/teilnahmen-api.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "mkj-termin-teilnahme",
    templateUrl: "./termin-teilnahme.component.html",
    styleUrls: ["./termin-teilnahme.component.scss"],
})
export class TerminTeilnahmeComponent {
    private _termin: Termin;
    @Input()
    public get termin(): Termin {
        return this._termin;
    }
    public set termin(value: Termin) {
        this._termin = value;
        if (value.id) {
            this.getStatus();
        }
    }

    public status: "abwesend" | "anwesend";
    public options = TerminTeilnahmeMap;
    public loading: boolean;

    constructor(
        private teilnahmeService: TeilnahmenApiService,
        private infoService: InfoService
    ) {}

    public getStatus(): void {
        this.loading = true;
        this.teilnahmeService
            .getTeilnahmeStatus(this.termin.id)
            .subscribe((data) => {
                this.status = data?.status;
                this.loading = false;
            });
    }

    public updateStatus(): void {
        this.loading = true;
        if (this.status) {
            this.teilnahmeService
                .updateTeilnahme(this.termin.id, this.status)
                .subscribe({
                    next: (data) => {
                        this.infoService.info(data.message);
                        this.loading = false;
                    },
                    error: (error) => {
                        this.infoService.error(error);
                        this.loading = false;
                    },
                });
        } else {
            this.teilnahmeService.removeTeilnahme(this.termin.id).subscribe({
                next: (data) => {
                    this.infoService.info(data.message);
                    this.loading = false;
                },
                error: (error) => {
                    this.infoService.error(error);
                    this.loading = false;
                },
            });
        }
    }
}

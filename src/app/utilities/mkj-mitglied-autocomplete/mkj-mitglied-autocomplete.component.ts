import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { FullNamePipe } from "src/app/pipes/full-name.pipe";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";

@Component({
    selector: "mkj-mitglied-autocomplete",
    templateUrl: "./mkj-mitglied-autocomplete.component.html",
    styleUrls: ["./mkj-mitglied-autocomplete.component.scss"],
    providers: [FullNamePipe],
})
export class MkjMitgliedAutocompleteComponent {
    @Input()
    public label: string = "Mitglied";

    private _mitglied: Mitglied;
    @Input()
    public get mitglied(): Mitglied {
        return this._mitglied;
    }
    public set mitglied(value: Mitglied) {
        this._mitglied = value;
        this.internalMitglied = this.getWrappedMitglied(value);
    }

    @Output()
    public mitgliedChange = new EventEmitter<Mitglied>();

    public internalMitglied: { name: string; mitglied: Mitglied };
    public mitgliederSearchResult: { name: string; mitglied: Mitglied }[];

    constructor(
        private mitgliederService: MitgliederApiService,
        private fullNamePipe: FullNamePipe
    ) {}

    public searchMitglieder(event: any) {
        this.mitgliederService
            .searchMitglieder(event.query)
            .subscribe((data) => {
                this.mitgliederSearchResult = data.map((e) => {
                    return this.getWrappedMitglied(e);
                });
            });
    }

    private getWrappedMitglied(mitglied: Mitglied) {
        return {
            mitglied: mitglied,
            name: this.fullNamePipe.transform(mitglied),
        };
    }
}

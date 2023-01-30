import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Noten } from "src/app/models/Noten";
import { NotenApiService } from "src/app/services/api/noten-api.service";

@Component({
    selector: "app-mkj-notensuche",
    templateUrl: "./mkj-notensuche.component.html",
    styleUrls: ["./mkj-notensuche.component.scss"],
})
export class MkjNotensucheComponent {
    private _selectedNoten: Noten;
    public get selectedNoten(): Noten {
        return this._selectedNoten;
    }
    public set selectedNoten(value: Noten) {
        this._selectedNoten = value;
        if (!value) {
            this.verzeichnisNr = null;
        }
    }

    private _verzeichnisNr: string;
    public get verzeichnisNr(): string {
        return this._verzeichnisNr;
    }
    public set verzeichnisNr(value: string) {
        this._verzeichnisNr = value;
        if (!value && this.verzeichnisMode) {
            this._selectedNoten = null;
        }
    }

    @Input()
    public verzeichnisMode: boolean = false;

    @Input()
    public placeholder: string = "Stück suchen...";

    @Input()
    public minLength = 2;

    @Input()
    public autoHighlight: boolean = true;

    public searchNotenResult: Noten[];

    @Output()
    public notenSelect = new EventEmitter<NotenSucheOutput>();

    constructor(private notenService: NotenApiService) {}

    public searchNoten(event) {
        this.notenService.searchNoten(event.query).subscribe({
            next: (res) => (this.searchNotenResult = res),
        });
    }

    public onSelect(noten: Noten) {
        this.notenSelect.emit({
            noten: noten,
            verzeichnisNr: this.verzeichnisNr,
        });
        this.selectedNoten = null;
    }

    public onAddButtonClick(): void {
        if (this.verzeichnisNr && this.selectedNoten) {
            this.onSelect(this.selectedNoten);
        }
    }
}

export interface NotenSucheOutput {
    noten: Noten;
    verzeichnisNr?: string;
}

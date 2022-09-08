import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Noten } from "src/app/interfaces/Noten";
import { NotenService } from "src/app/services/noten.service";

@Component({
    selector: "app-mkj-notensuche",
    templateUrl: "./mkj-notensuche.component.html",
    styleUrls: ["./mkj-notensuche.component.scss"],
})
export class MkjNotensucheComponent implements OnInit {
    @Input()
    public selectedNoten: Noten;

    @Input()
    public verzeichnisMode: boolean = false;

    @Input()
    public placeholder: string = "Musikstück suchen...";

    @Input()
    public minLength = 2;

    @Input()
    public autoHighlight: boolean = true;

    public searchNotenResult: Noten[];
    public verzeichnisNr: string;

    @Output()
    public notenSelect = new EventEmitter<NotenSucheOutput>();

    constructor(private notenService: NotenService) {}

    ngOnInit(): void {}

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
    }
}

export interface NotenSucheOutput {
    noten: Noten;
    verzeichnisNr: string;
}

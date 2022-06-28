import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Noten } from "src/app/mkjInterfaces/Noten";
import { NotenService } from "src/app/mkjServices/noten.service";

@Component({
    selector: "app-mkj-notensuche",
    templateUrl: "./mkj-notensuche.component.html",
    styleUrls: ["./mkj-notensuche.component.scss"],
})
export class MkjNotensucheComponent implements OnInit {
    @Input()
    public selectedNoten: Noten;

    public searchNotenResult: Noten[];

    @Output()
    public onSelect = new EventEmitter<Noten>();

    constructor(private notenService: NotenService) {}

    ngOnInit(): void {}

    public searchNoten(event) {
        this.notenService.searchNoten(event.query).subscribe({
            next: (res) => (this.searchNotenResult = res),
        });
    }
}

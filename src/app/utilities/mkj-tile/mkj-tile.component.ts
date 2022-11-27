import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "mkj-tile",
    templateUrl: "./mkj-tile.component.html",
    styleUrls: ["./mkj-tile.component.scss"],
})
export class MkjTileComponent implements OnInit {
    @Input()
    public label: string;

    constructor() {}

    ngOnInit(): void {}
}

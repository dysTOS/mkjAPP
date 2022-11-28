import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "mkj-tile",
    templateUrl: "./mkj-tile.component.html",
    styleUrls: ["./mkj-tile.component.scss"],
})
export class MkjTileComponent {
    @Input()
    public label: string;

    private _color: any;
    @Input()
    public get color(): any {
        return this._color;
    }
    public set color(value: any) {
        this._color = value;
        this.setColors(value);
    }

    @Output()
    public click = new EventEmitter<void>();

    public colorStrong: string;
    public colorLight: string;

    constructor() {}

    public setColors(c: any) {
        this.colorStrong = c;
        this.colorLight = c + "b3";
    }
}

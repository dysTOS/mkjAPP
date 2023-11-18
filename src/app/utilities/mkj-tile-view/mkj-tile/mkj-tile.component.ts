import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UtilFunctions } from "src/app/helpers/util-functions";

@Component({
    selector: "mkj-tile",
    templateUrl: "./mkj-tile.component.html",
    styleUrls: ["./mkj-tile.component.scss"],
})
export class MkjTileComponent {
    @Input()
    public label: string;

    @Input()
    public labelBottomLeft: string;

    @Input()
    public labelBottomRight: string;

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
    public textColor: string;

    constructor() {}

    public setColors(c: any) {
        c = c ? c : "#666666";
        this.colorStrong = c;
        this.colorLight = c + "b3";
        this.textColor = UtilFunctions.isDarkBackground(c)
            ? "#ffffff"
            : "#000000";
    }
}

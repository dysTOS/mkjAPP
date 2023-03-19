import { Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";

@Component({
    selector: "mkj-color-picker",
    templateUrl: "./mkj-color-picker.component.html",
    styleUrls: ["./mkj-color-picker.component.scss"],
    providers: [controlValueAccessor(MkjColorPickerComponent)],
})
export class MkjColorPickerComponent implements ControlValueAccessor {
    @Input()
    public label: string;

    public internString: string;

    public _onChange: (_: string) => void;
    public _onTouched: () => void;

    public disabled: boolean;

    constructor() {}

    writeValue(obj: any): void {
        this.internString = obj;
    }
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}

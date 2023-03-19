import { AfterViewInit, Component, Injector, Input } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";

@Component({
    selector: "mkj-boolean-input",
    templateUrl: "./mkj-boolean-input.component.html",
    styleUrls: ["./mkj-boolean-input.component.scss"],
    providers: [controlValueAccessor(MkjBooleanInputComponent)],
})
export class MkjBooleanInputComponent
    implements ControlValueAccessor, AfterViewInit
{
    @Input()
    public label: string;

    public value: boolean = false;

    public _registerOnChange: (_: any) => void;
    public _registerOnTouched: () => void;
    public isDisabled: boolean = false;

    ngControl: NgControl;

    constructor(private inj: Injector) {}

    ngAfterViewInit(): void {
        this.ngControl = this.inj.get(NgControl);
    }

    writeValue(obj: any): void {
        if (obj) {
            this.value = true;
        } else {
            this.value = false;
        }
    }
    registerOnChange(fn: any): void {
        this._registerOnChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._registerOnTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}

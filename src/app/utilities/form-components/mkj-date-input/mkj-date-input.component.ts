import { AfterViewInit, Component, Injector, Input } from "@angular/core";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import * as moment from "moment";
import { ControlValueAccessor, NgControl } from "@angular/forms";

export enum MkjDateType {
    DATE = "date",
    TIME = "time",
    COMBINED = "combined",
}

@Component({
    selector: "mkj-date-input",
    templateUrl: "./mkj-date-input.component.html",
    styleUrls: ["./mkj-date-input.component.scss"],
    providers: [controlValueAccessor(MkjDateInputComponent)],
})
export class MkjDateInputComponent
    implements ControlValueAccessor, AfterViewInit
{
    @Input()
    public type: MkjDateType = MkjDateType.COMBINED;

    @Input()
    public label: string;

    public internModel: Date | string;

    public MkjDateType = MkjDateType;

    public _registerOnChange: (_: any) => void;
    public _registerOnTouched: () => void;
    public isDisabled: boolean = false;

    ngControl: NgControl;

    constructor(private inj: Injector) {}

    ngAfterViewInit() {
        this.ngControl = this.inj.get(NgControl);
    }

    writeValue(obj: any): void {
        if (obj) {
            switch (this.type) {
                case MkjDateType.DATE:
                    this.internModel = new Date(obj);
                    break;
                case MkjDateType.TIME:
                    this.internModel = obj;
                    break;
                case MkjDateType.COMBINED:
                    this.internModel = new Date(obj);
                    break;
            }
        } else {
            this.internModel = null;
        }
    }

    registerOnChange(fn: any): void {
        this._registerOnChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._registerOnTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public onModelChange(newDate: Date | string) {
        if (!newDate) {
            this._registerOnChange(null);
            return;
        }

        switch (this.type) {
            case MkjDateType.DATE:
                this._registerOnChange(moment(newDate).format("YYYY-MM-DD"));
                break;
            case MkjDateType.TIME:
                this._registerOnChange(newDate);
                break;
            case MkjDateType.COMBINED:
                this._registerOnChange(
                    moment(newDate).format("YYYY-MM-DD hh:mm:ss")
                );
                break;
        }
    }
}

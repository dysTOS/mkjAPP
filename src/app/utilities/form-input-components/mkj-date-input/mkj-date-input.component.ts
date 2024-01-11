import {
    AfterViewInit,
    Component,
    EventEmitter,
    Injector,
    Input,
    Output,
} from "@angular/core";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import * as moment from "moment";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";

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

    @Input()
    public internModel: Date | string;

    @Output()
    public valueChanged = new EventEmitter<string | Date>();

    public MkjDateType = MkjDateType;

    public _registerOnChange: (_: any) => void;
    public _registerOnTouched: () => void;
    public isDisabled: boolean = false;

    private _value: string | Date;
    @Input()
    public get value(): string | Date {
        return this._value;
    }
    public set value(value: string | Date) {
        this._value = value;
        if (!value) {
            this.internModel = null;
        } else if (this.type === MkjDateType.TIME) {
            this.internModel = value;
        } else {
            this.internModel = new Date(value);
        }
    }

    formControl: FormControl;

    constructor(private inj: Injector) {}

    ngAfterViewInit() {
        this.formControl = this.inj.get(NgControl, null)
            ?.control as FormControl;
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
            this.valueChanged.emit(null);
            this._registerOnChange?.(null);
            return;
        }

        switch (this.type) {
            case MkjDateType.DATE:
                const date = moment(newDate).format("YYYY-MM-DD");
                this.valueChanged.emit(date);
                this._registerOnChange?.(date);
                break;
            case MkjDateType.TIME:
                this.valueChanged.emit(newDate);
                this._registerOnChange?.(newDate);
                break;
            case MkjDateType.COMBINED:
                const combined = moment(newDate).format("YYYY-MM-DD hh:mm:ss");
                this.valueChanged.emit(date);
                this._registerOnChange?.(combined);
                break;
        }
    }
}

import {
    Component,
    EventEmitter,
    Injector,
    Input,
    Output,
} from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";
import { BehaviorSubject, Observable, distinctUntilChanged } from "rxjs";

@Component({
    selector: "abstract-control-accessor",
    template: "",
})
export abstract class AbstractControlAccessor<T>
    implements ControlValueAccessor
{
    private _value = new BehaviorSubject<T>(null);
    private _disabled = new BehaviorSubject(false);

    private _registerOnChange: (_: T) => void;
    private _registerOnTouched: () => void;

    @Input()
    public set value(value: T) {
        this._value.next(value);
    }

    public get disabled(): boolean {
        return this._disabled.value;
    }

    @Input()
    public set disabled(isDisabled: boolean) {
        this._disabled.next(isDisabled);
    }

    @Input()
    public label: string;

    @Output()
    public valueChange = new EventEmitter<T>();

    public get value$(): Observable<T> {
        return this._value;
    }

    public get disabled$(): Observable<boolean> {
        return this._disabled.pipe(distinctUntilChanged());
    }

    public formControl: FormControl;

    constructor(private inj: Injector) {}

    public ngAfterViewInit() {
        this.formControl = this.inj.get(NgControl, null)
            ?.control as FormControl;
    }

    public change(value: T) {
        this._registerOnChange?.(value);
        this.valueChange.emit(value);
    }

    public touch() {
        this._registerOnTouched?.();
    }

    writeValue(obj: T): void {
        this._value.next(obj);
    }
    registerOnChange(fn: any): void {
        this._registerOnChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._registerOnTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this._disabled.next(isDisabled);
    }
}

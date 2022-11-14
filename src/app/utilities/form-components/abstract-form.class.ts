import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import {
    AbstractControl,
    ControlValueAccessor,
    FormGroup,
} from "@angular/forms";
import { CanDeactivate } from "@angular/router";
import { Subscription } from "rxjs";
import { SubSink } from "subsink";

@Component({
    template: ``,
})
export class AbstractFormComponent
    implements
        ControlValueAccessor,
        CanDeactivate<AbstractFormComponent>,
        OnInit,
        OnDestroy
{
    public form: FormGroup;

    get value(): any {
        return this.form.value;
    }

    set value(value: any) {
        this.form.setValue(value);
        this._onChange(value);
        this._onTouched();
    }

    protected loading: boolean = true;

    protected subSink = new SubSink();

    @HostListener("window:unload", ["$event"])
    onPageUnload(event: Event) {
        console.log("unload");
        alert(event); //TODO: implement
    }

    public _onTouched: Function = () => {};
    public _onChange: Function = (value): void => undefined;

    public onChangeSubs: Subscription[] = [];

    constructor() {}

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    public canDeactivate(): boolean {
        return this.form?.pristine;
    }

    public writeValue(value: any) {
        if (value) {
            this.form?.patchValue(value, { emitEvent: false });
        }
    }

    public registerOnChange(onChange: any): void {
        const sub = this.form.valueChanges.subscribe(onChange);
        this.onChangeSubs.push(sub);
    }

    public registerOnTouched(onTouched: Function) {
        this._onTouched = onTouched;
    }

    public setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form?.disable();
        } else {
            this.form?.enable();
        }
    }

    public validate(control: AbstractControl) {
        if (this.form?.valid) {
            return null;
        } else {
            return { ausrueckung: { valid: false } };
        }
    }
}

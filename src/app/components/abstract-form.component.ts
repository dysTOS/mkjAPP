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
    protected form: FormGroup;

    protected loading: boolean = true;

    protected subSink = new SubSink();

    @HostListener("window:unload", ["$event"])
    onPageUnload(event: Event) {
        alert(event); //TODO: implement
    }

    public onTouched: Function = () => {};

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
            this.form.setValue(value, { emitEvent: false });
        }
    }

    public registerOnChange(onChange: any): void {
        this.subSink.add(this.form.valueChanges.subscribe(onChange));
    }

    public registerOnTouched(onTouched: Function) {
        this.onTouched = onTouched;
    }

    public setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    validate(control: AbstractControl) {
        if (this.form.valid) {
            return null;
        }

        let errors: any = {};

        // errors = this.addControlErrors(errors, "addressLine1");
        // errors = this.addControlErrors(errors, "addressLine2");
        // errors = this.addControlErrors(errors, "zipCode");
        // errors = this.addControlErrors(errors, "city");

        return errors;
    }

    addControlErrors(allErrors: any, controlName: string) {
        const errors = { ...allErrors };

        const controlErrors = this.form.controls[controlName].errors;

        if (controlErrors) {
            errors[controlName] = controlErrors;
        }

        return errors;
    }
}

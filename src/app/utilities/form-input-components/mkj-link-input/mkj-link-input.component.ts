import { Component, Input } from "@angular/core";
import {
    AbstractControl,
    ControlValueAccessor,
    ValidationErrors,
    Validator,
} from "@angular/forms";
import { controlValidator } from "src/app/providers/control-validator";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";

export type Link = {
    url: string;
    label: string;
};

@Component({
    selector: "mkj-link-input",
    templateUrl: "./mkj-link-input.component.html",
    styleUrls: ["./mkj-link-input.component.scss"],
    providers: [
        controlValueAccessor(MkjLinkInputComponent),
        controlValidator(MkjLinkInputComponent),
    ],
})
export class MkjLinkInputComponent implements ControlValueAccessor, Validator {
    private _jsonLinks: string;
    @Input()
    public get jsonLinks(): string {
        return this._jsonLinks;
    }
    public set jsonLinks(value: string) {
        this._jsonLinks = value;
        this.writeValue(value);
    }

    @Input()
    public readonly: boolean;

    public links: Link[] = [];

    public addLink: Link = {
        url: "",
        label: "",
    };

    public disabled: boolean;

    public onChange: (value: string) => void;
    public onTouch: () => void;

    constructor() {}

    public addLinkToList(): void {
        if (this.addLink.url && this.addLink.label) {
            if (!this.addLink.url.startsWith("http")) {
                this.addLink.url = "https://" + this.addLink.url;
            }
            this.links.push(this.addLink);
            this.addLink = {
                url: "",
                label: "",
            };
            this.onInternChange();
        }
    }

    public removeLink(index: number): void {
        this.links.splice(index, 1);
        this.onInternChange();
    }

    public onInternChange(): void {
        if (this.links.length === 0) {
            this.onChange(null);
        } else {
            const formattedValue = JSON.stringify(this.links);
            this.onChange(formattedValue);
        }
        this.onTouch();
    }

    writeValue(obj: string): void {
        try {
            this.links = JSON.parse(obj) ?? [];
        } catch {
            this.links = [];
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    validate(control: AbstractControl<any, any>): ValidationErrors {
        console.log("validate");
        if (!this.addLink.label && !this.addLink.url) {
            return null;
        }

        if (!this.addLink.label || !this.addLink.url) {
            return {
                invalidEntries: true,
            };
        }

        const value = control.value;
        if (value) {
            try {
                JSON.parse(value);
            } catch {
                return {
                    invalidJson: true,
                };
            }
        }
        return null;
    }
}

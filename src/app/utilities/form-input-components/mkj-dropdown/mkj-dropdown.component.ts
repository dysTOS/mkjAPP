import { Component, Input } from "@angular/core";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { AbstractControlAccessor } from "../abstract-control-accessor";

export interface MkjDropdownOption {
    label: string;
    value: any;
}

@Component({
    selector: "mkj-dropdown",
    templateUrl: "./mkj-dropdown.component.html",
    styleUrls: ["./mkj-dropdown.component.scss"],
    providers: [controlValueAccessor(MkjDropdownComponent)],
})
export class MkjDropdownComponent extends AbstractControlAccessor<any> {
    @Input()
    public options: MkjDropdownOption[] = [];
}

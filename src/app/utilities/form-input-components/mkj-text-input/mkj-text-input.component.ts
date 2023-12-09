import { Component, Injector, Input } from "@angular/core";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { AbstractControlAccessor } from "../abstract-control-accessor";

@Component({
    selector: "mkj-text-input",
    templateUrl: "./mkj-text-input.component.html",
    styleUrls: ["./mkj-text-input.component.scss"],
    providers: [controlValueAccessor(MkjTextInputComponent)],
})
export class MkjTextInputComponent extends AbstractControlAccessor<string> {
    @Input()
    public iconRight: string;

    constructor(inj: Injector) {
        super(inj);
    }
}

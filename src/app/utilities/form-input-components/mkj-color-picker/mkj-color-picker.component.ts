import { Component, Injector } from "@angular/core";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { AbstractControlAccessor } from "../abstract-control-accessor";

@Component({
    selector: "mkj-color-picker",
    templateUrl: "./mkj-color-picker.component.html",
    styleUrls: ["./mkj-color-picker.component.scss"],
    providers: [controlValueAccessor(MkjColorPickerComponent)],
})
export class MkjColorPickerComponent extends AbstractControlAccessor<string> {
    constructor(injector: Injector) {
        super(injector);
    }
}

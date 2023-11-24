import { Component } from "@angular/core";
import { AbstractControlAccessor } from "../abstract-control-accessor";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";

@Component({
    selector: "mkj-text-area-input",
    templateUrl: "./mkj-text-area-input.component.html",
    styleUrls: ["./mkj-text-area-input.component.scss"],
    providers: [controlValueAccessor(MkjTextAreaInputComponent)],
})
export class MkjTextAreaInputComponent extends AbstractControlAccessor<string> {}

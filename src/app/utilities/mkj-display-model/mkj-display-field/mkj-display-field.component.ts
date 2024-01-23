import { Component, Input } from "@angular/core";

@Component({
    selector: "mkj-display-field",
    templateUrl: "./mkj-display-field.component.html",
    styleUrls: ["./mkj-display-field.component.scss"],
})
export class MkjDisplayFieldComponent {
    @Input()
    label: string;

    @Input()
    value: unknown;
}

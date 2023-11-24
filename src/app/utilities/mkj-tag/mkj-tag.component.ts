import { Component, Input } from "@angular/core";

@Component({
    selector: "mkj-tag",
    templateUrl: "./mkj-tag.component.html",
    styleUrls: ["./mkj-tag.component.scss"],
})
export class MkjTagComponent {
    @Input() label: string;

    @Input() icon: string;

    @Input() styleClass: string;

    @Input() severity: "success" | "danger" | "warning" | "info";

    public rounded: boolean = false;
}

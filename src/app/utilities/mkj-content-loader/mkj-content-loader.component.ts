import { Component, Input } from "@angular/core";

@Component({
    selector: "mkj-content-loader",
    templateUrl: "./mkj-content-loader.component.html",
    styleUrls: ["./mkj-content-loader.component.scss"],
})
export class MkjContentLoaderComponent {
    @Input()
    public loading: boolean = false;

    @Input()
    public minHeight: string = "100%";

    @Input()
    public maxHeight: string = "100%";

    @Input()
    public size: string = "2rem";

    @Input()
    public type: "spinner" | "skeleton" = "spinner";
}

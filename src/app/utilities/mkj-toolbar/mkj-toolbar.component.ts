import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { MkjToolbarService } from "./mkj-toolbar.service";

@Component({
    selector: "app-mkj-toolbar",
    templateUrl: "./mkj-toolbar.component.html",
    styleUrls: ["./mkj-toolbar.component.scss"],
})
export class MkjToolbarComponent {
    constructor(
        public location: Location,
        public toolbarService: MkjToolbarService
    ) {}
}

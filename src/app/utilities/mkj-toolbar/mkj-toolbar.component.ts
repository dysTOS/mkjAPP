import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MkjToolbarService } from "./mkj-toolbar.service";

@Component({
    selector: "app-mkj-toolbar",
    templateUrl: "./mkj-toolbar.component.html",
    styleUrls: ["./mkj-toolbar.component.scss"],
})
export class MkjToolbarComponent {
    constructor(
        public toolbarService: MkjToolbarService,
        public router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    public navigateBack(): void {
        this.location.back();
        //TODO fix back-routing
        // this.router.navigate([this.toolbarService.backButtonLink], {
        //     relativeTo: this.route,
        // });
    }
}

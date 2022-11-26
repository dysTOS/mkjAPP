import { Location } from "@angular/common";
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "src/app/services/authentication/user.service";
import { SubSink } from "subsink";
import { MkjToolbarDatasource } from "./mkj-toolbar-datasource";

@Component({
    selector: "app-mkj-toolbar",
    templateUrl: "./mkj-toolbar.component.html",
    styleUrls: ["./mkj-toolbar.component.scss"],
})
export class MkjToolbarComponent implements OnInit, OnDestroy {
    @Input()
    public datasource: MkjToolbarDatasource;

    private subSink = new SubSink();

    constructor(private userService: UserService, public location: Location) {}

    public ngOnInit() {
        this.subSink.add(
            this.userService.getCurrentUserPermissions().subscribe({
                next: (_) => {
                    this.updateButtonVisibilities();
                },
            })
        );
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    private updateButtonVisibilities() {
        this.datasource?.buttons?.forEach((btn) => {
            if (
                btn.permissions &&
                !this.userService.hasOneOfPermissions(btn.permissions)
            ) {
                btn.visible = false;
            } else {
                btn.visible = true;
            }
        });
    }
}

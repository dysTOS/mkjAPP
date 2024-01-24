import { Location } from "@angular/common";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import {
    ActivatedRoute,
    ActivationStart,
    NavigationEnd,
    Router,
} from "@angular/router";
import { PermissionKey } from "src/app/models/User";
import { UserService } from "src/app/services/authentication/user.service";
import { SubSink } from "subsink";

export interface MkjToolbarButton {
    icon: string;
    label?: string;
    permissions?: PermissionKey[];
    routerLink?: string;
    click?: (event: MouseEvent) => void;
    visible?: boolean;
    hidden?: boolean;
    highlighted?: boolean;
}

@Injectable({
    providedIn: "root",
})
export class MkjToolbarService implements OnInit, OnDestroy {
    public backButton: boolean;
    public header: string;
    public temporaryBackRoute: { backRoute: string; route: ActivatedRoute };

    private _buttons: MkjToolbarButton[];
    public get buttons(): MkjToolbarButton[] {
        return this._buttons;
    }
    public set buttons(value: MkjToolbarButton[]) {
        this._buttons = value;
        this.updateButtonVisibilities();
    }

    private subSink = new SubSink();
    private firstUserNavigationHappened = null;

    constructor(
        private userService: UserService,
        private router: Router,
        private location: Location
    ) {
        this.subSink.add(
            this.router.events.subscribe({
                next: (event) => {
                    if (event instanceof ActivationStart) {
                        this.resetToolbar();
                    }
                    if (event instanceof NavigationEnd) {
                        if (this.firstUserNavigationHappened == null) {
                            this.firstUserNavigationHappened = false;
                        } else {
                            this.firstUserNavigationHappened = true;
                        }
                    }
                },
            })
        );
    }

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
        this.buttons?.forEach((btn) => {
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

    public resetToolbar(): void {
        this.backButton = null;
        this.header = null;
        this.buttons = null;
    }

    public navigateBack(): void {
        if (this.temporaryBackRoute) {
            this.router.navigate([this.temporaryBackRoute.backRoute], {
                relativeTo: this.temporaryBackRoute.route,
            });
            this.temporaryBackRoute = null;
        } else if (this.firstUserNavigationHappened) {
            this.temporaryBackRoute = null;
            this.location.back();
        } else {
            this.temporaryBackRoute = null;
            this.router.navigateByUrl("/");
        }
    }
}

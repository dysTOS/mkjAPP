import { Injectable, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { UserService } from "src/app/services/authentication/user.service";
import { SubSink } from "subsink";

export interface MkjToolbarButton {
    icon: string;
    label?: string;
    permissions?: string[];
    click?: (event: MouseEvent) => void;
    visible?: boolean;
}

@Injectable({
    providedIn: "root",
})
export class MkjToolbarService implements OnInit, OnDestroy {
    public backButton: boolean;
    public header: string;
    public contentSectionExpanded: boolean;
    public contentSectionTemplate: TemplateRef<any>;

    private _buttons: MkjToolbarButton[];
    public get buttons(): MkjToolbarButton[] {
        return this._buttons;
    }
    public set buttons(value: MkjToolbarButton[]) {
        this._buttons = value;
        this.updateButtonVisibilities();
    }

    private subSink = new SubSink();

    constructor(private userService: UserService, private router: Router) {
        this.subSink.add(
            this.router.events.subscribe({
                next: (event) => {
                    if (event instanceof NavigationStart) {
                        this.resetToolbar();
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

    private resetToolbar() {
        this.backButton = false;
        this.header = null;
        this.contentSectionTemplate = null;
        this.contentSectionExpanded = false;
        this.buttons = null;
    }
}

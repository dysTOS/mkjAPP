import { Subscription } from "rxjs";
import {
    Directive,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from "@angular/core";
import { UserService } from "../services/authentication/user.service";

@Directive({
    selector: "[visibleFor]",
})
export class VisibleForPermissionDirective implements OnDestroy {
    private subscription: Subscription;

    constructor(
        private userService: UserService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    @Input() set visibleFor(permissions: string[]) {
        let isVisible: boolean = false;
        this.viewContainer.clear();
        this.subscription = this.userService
            .getCurrentUserPermissions()
            .subscribe({
                next: () => {
                    permissions.forEach((r) => {
                        if (this.userService.hasPermission(r)) isVisible = true;
                    });
                    if (isVisible) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.viewContainer.clear();
                    }
                },
            });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}

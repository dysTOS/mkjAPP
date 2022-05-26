import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserService } from "../mkjServices/authentication/user.service";

@Directive({
    selector: "[visibleFor]",
})
export class VisibleForPermissionDirective {
    constructor(
        private userService: UserService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input() set visibleFor(permissions: string[]) {
        let isVisible: boolean = false;
        this.viewContainer.clear();
        this.userService.getCurrentUserPermissions().subscribe({
            next: () => {
                permissions.forEach(r => {
                    if (this.userService.hasPermission(r)) isVisible = true
                });
                if (isVisible) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
                else {
                    this.viewContainer.clear();
                }
            }
        })
    }
}

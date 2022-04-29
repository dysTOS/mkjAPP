import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { RoleType } from "../mkjInterfaces/User";
import { UserService } from "../mkjServices/authentication/user.service";

@Directive({
    selector: "[visibleFor]",
})
export class VisibleForDirective {
    constructor(
        private userService: UserService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input() set visibleFor(roles: RoleType[]) {
        let isVisible: boolean = false;
        this.viewContainer.clear();
        this.userService.getCurrentUserRoles().subscribe({
            next: () => {
                roles.forEach(r => {
                    if (this.userService.hasRole(r)) isVisible = true
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

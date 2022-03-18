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
    ) {}

    @Input() set visibleFor(roles: RoleType[]) {
        let hasRole = false;
        console.log(roles);

        if (hasRole) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

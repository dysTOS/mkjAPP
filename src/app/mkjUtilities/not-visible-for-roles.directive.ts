import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleType } from '../mkjInterfaces/User';
import { UserService } from '../mkjServices/authentication/user.service';

@Directive({
    selector: '[notVisibleFor]'
})
export class NotVisibleForRolesDirective {
    constructor(
        private userService: UserService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input() set notVisibleFor(roles: RoleType[]) {
        let isNotVisible: boolean = false;
        this.userService.getCurrentUserRoles().subscribe({
            next: () => {
                roles.forEach(r => {
                    if (this.userService.hasRole(r)) isNotVisible = true
                });
                if (isNotVisible) {
                    this.viewContainer.clear();
                }
                else {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
            }
        })
    }

}

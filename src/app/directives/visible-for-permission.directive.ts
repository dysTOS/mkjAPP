import { Subscription } from 'rxjs';
import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/authentication/user.service';
import { PermissionKey } from '../models/User';

@Directive({
  selector: '[visibleFor]',
})
export class VisibleForPermissionDirective implements OnDestroy {
  private _sub: Subscription;

  constructor(
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input({ required: true }) set visibleFor(permissions: PermissionKey[]) {
    if (!permissions || permissions.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
    this.viewContainer.clear();
    this._sub = this.userService.getCurrentUserPermissions().subscribe({
      next: () => {
        if (this.userService.hasOneOfPermissions(permissions)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      },
    });
  }

  public ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}

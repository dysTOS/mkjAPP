import { Injectable } from "@angular/core";
import { Router, UrlTree, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { MenuService } from "../services/menu.service";
import { environment } from "src/environments/environment";
import { UserService } from "../services/authentication/user.service";
import { PermissionKey } from "../models/User";

@Injectable()
export class RouteGuard {
    constructor(
        private router: Router,
        private userService: UserService,
        private menuService: MenuService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ): boolean | UrlTree | Observable<boolean> {
        const item = this.menuService.getMenuItemByRouterLink(
            route.url[0].path
        );
        // TODO: add permissions in router.module and check there, use permissions of menu-model only for visibility and not for the guard!!

        const permission = item?.permission;

        if (
            !permission ||
            this.userService.hasPermission(permission as PermissionKey)
        ) {
            return true;
        } else {
            return this.router.parseUrl(environment.prefix + "/noaccess");
        }
    }
}

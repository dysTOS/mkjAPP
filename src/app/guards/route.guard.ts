import { Injectable } from "@angular/core";
import {
    Router,
    CanActivate,
    UrlTree,
    ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { MenuService } from "../services/menu.service";
import { environment } from "src/environments/environment";
import { UserService } from "../services/authentication/user.service";

@Injectable()
export class RouteGuard implements CanActivate {
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

        const permission = item?.permission;

        if (!permission || this.userService.hasPermission(permission)) {
            return true;
        } else {
            return this.router.parseUrl(environment.prefix + "/noaccess");
        }
    }
}

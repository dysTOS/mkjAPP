import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PermissionKey } from "../models/User";
import { UserService } from "../services/authentication/user.service";

@Injectable()
export class RouteGuard {
    constructor(private router: Router, private userService: UserService) {}

    public canActivate(
        route: ActivatedRouteSnapshot
    ): boolean | UrlTree | Observable<boolean> {
        const permissions = route.data?.permissions as PermissionKey[];

        if (!permissions || permissions.length === 0) {
            return true;
        }

        if (this.userService.hasOneOfPermissions(permissions)) {
            return true;
        } else {
            return this.router.parseUrl(environment.prefix + "/access");
        }
    }
}

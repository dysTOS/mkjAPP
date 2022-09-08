import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../mkjServices/authentication/user.service";
import { ThemeService } from "../mkjServices/theme.service";

export const initFactory = (
    userService: UserService,
    themeService: ThemeService
) => {
    return () => userService.initializeUserData();
};

export const MkjAppInitializer = {
    provide: APP_INITIALIZER,
    useFactory: initFactory,
    deps: [UserService, ThemeService],
    multi: true,
};

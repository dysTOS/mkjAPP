import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../authentication/user.service";

export const initFactory = (userService: UserService) => {
    return () => userService.initializeUserData();
};

export const MkjAppInitializer = {
    provide: APP_INITIALIZER,
    useFactory: initFactory,
    deps: [UserService],
    multi: true,
};

import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../services/authentication/user.service";
import { ServiceWorkerService } from "../services/service-worker.service";
import { ThemeService } from "../services/theme.service";

export const mkjAppInitializer = () => {
    return {
        provide: APP_INITIALIZER,
        useFactory: (
            userService: UserService,
            themeService: ThemeService,
            serviceWorkerService: ServiceWorkerService
        ) => {
            return () => userService.initializeUserData();
        },
        deps: [UserService, ThemeService, ServiceWorkerService],
        multi: true,
    };
};

import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../services/authentication/user.service";
import { ServiceWorkerService } from "../services/service-worker.service";
import { ThemeService } from "../services/theme.service";

export const mkjAppInitializer = () => {
    return {
        provide: APP_INITIALIZER,
        useFactory: (
            themeService: ThemeService,
            userService: UserService,
            serviceWorkerService: ServiceWorkerService
        ) => {
            return () => userService.initializeUserData();
        },
        deps: [ThemeService, UserService, ServiceWorkerService],
        multi: true,
    };
};

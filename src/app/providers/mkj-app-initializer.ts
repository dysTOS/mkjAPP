import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../services/authentication/user.service";
import { ServiceWorkerService } from "../services/service-worker.service";
import { ThemeService } from "../services/theme.service";
import { AppNamingService } from "../services/config.service";
import { switchMap } from "rxjs";

export const mkjAppInitializer = () => {
    return {
        provide: APP_INITIALIZER,
        useFactory: (
            themeService: ThemeService,
            userService: UserService,
            appNamingService: AppNamingService,
            serviceWorkerService: ServiceWorkerService
        ) => {
            return () =>
                userService
                    .initializeUserData()
                    .pipe(
                        switchMap(() => appNamingService.initAppNamingConfig())
                    );
        },
        deps: [
            ThemeService,
            UserService,
            AppNamingService,
            ServiceWorkerService,
        ],
        multi: true,
    };
};

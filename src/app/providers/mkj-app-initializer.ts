import { APP_INITIALIZER } from "@angular/core";
import { UserService } from "../services/authentication/user.service";
import { ServiceWorkerService } from "../services/service-worker.service";
import { ThemeService } from "../services/theme.service";
import { AppConfigService } from "../services/app-config.service";
import { switchMap } from "rxjs";

export const mkjAppInitializer = () => {
    return {
        provide: APP_INITIALIZER,
        useFactory: (
            themeService: ThemeService,
            userService: UserService,
            appNamingService: AppConfigService,
            serviceWorkerService: ServiceWorkerService
        ) => {
            return () =>
                appNamingService
                    .initAppNamingConfig()
                    .pipe(switchMap(() => userService.initializeUserData()));
        },
        deps: [
            ThemeService,
            UserService,
            AppConfigService,
            ServiceWorkerService,
        ],
        multi: true,
    };
};

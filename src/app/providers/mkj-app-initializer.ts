import { APP_INITIALIZER } from '@angular/core';
import { UserService } from '../services/authentication/user.service';
import { ServiceWorkerService } from '../services/service-worker.service';
import { ThemeService } from '../services/theme.service';
import { ConfigurationService } from '../services/configuration.service';
import { switchMap } from 'rxjs';

export const mkjAppInitializer = () => {
  return {
    provide: APP_INITIALIZER,
    useFactory: (
      themeService: ThemeService,
      userService: UserService,
      appNamingService: ConfigurationService,
      serviceWorkerService: ServiceWorkerService
    ) => {
      return () => appNamingService.initAppNamingConfig().pipe(switchMap(() => userService.initializeUserData()));
    },
    deps: [ThemeService, UserService, ConfigurationService, ServiceWorkerService],
    multi: true,
  };
};

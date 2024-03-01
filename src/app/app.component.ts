import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { MkjPrimeTranslation } from 'src/configurations/primeTranslation';
import { AuthStateService } from './services/authentication/auth-state.service';
import { TokenService } from './services/authentication/token.service';
import { UserService } from './services/authentication/user.service';
import { UtilFunctions } from './helpers/util-functions';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  public ripple = true;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authStatService: AuthStateService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.authStatService.userAuthState.subscribe((isAuthenticated) => {
      if (!isAuthenticated && this.tokenService.isLoggedIn()) {
        this.userService.onLogout();
        this.tokenService.removeToken();
        this.router.navigate(['login']);
      }
    });

    this.primengConfig.ripple = UtilFunctions.isDesktop() === false;
    this.primengConfig.setTranslation(MkjPrimeTranslation);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginInput } from 'src/app/interfaces/api-middleware';
import { AuthAPIService } from 'src/app/services/api/auth-api.service';
import { AuthStateService } from 'src/app/services/authentication/auth-state.service';
import { TokenService } from 'src/app/services/authentication/token.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { InfoService } from 'src/app/services/info.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  isChecking: boolean = false;

  user: UserLoginInput = {
    email: null,
    passwort: null,
  };

  constructor(
    private router: Router,
    private authService: AuthAPIService,
    private tokenService: TokenService,
    private authState: AuthStateService,
    private userService: UserService,
    private infoService: InfoService
  ) {}

  public ngOnInit(): void {
    if (environment.publictest) {
      this.user = {
        email: 'testuser@test.at',
        passwort: 'test',
      };
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.checkInput()) {
      this.isChecking = true;
      this.authService.login(this.user).subscribe(
        (result) => {
          this.tokenService.saveToken(result.token);
          this.authState.setAuthState(true);
          this.userService.setCurrentUser(result.user);
          this.userService.setCurrentMitglied(result.mitglied);
          this.userService.setCurrentUserRoles(result.roles);
          this.userService.setCurrentUserPermissions(result.permissions);
          this.router.navigate(['dashboard']);
        },
        (error) => {
          this.infoService.error(error);
          this.isChecking = false;
        },
        () => (this.isChecking = false)
      );
    }
  }

  public onForgotPassword() {
    if (this.user.email == null) {
      this.infoService.error('Bitte gib deine E-Mail Adresse ein und drücke dann auf "Passwort vergessen".');
      return;
    }

    this.authService
      .forgotPassword(this.user.email)
      .subscribe({ next: (res) => this.infoService.info(res.message), error: (err) => this.infoService.error(err) });
  }

  private checkInput(): boolean {
    if (this.user.email && this.user.passwort) return true;
    return false;
  }
}

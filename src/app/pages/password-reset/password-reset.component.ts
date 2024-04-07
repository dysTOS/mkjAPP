import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAPIService } from 'src/app/services/api/auth-api.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit {
  submitted: boolean = false;
  isChecking: boolean = false;
  pwd: string = null;
  pwdCheck: string = null;

  constructor(
    private router: Router,
    private authService: AuthAPIService,
    private route: ActivatedRoute,
    private infoService: InfoService
  ) {}

  public ngOnInit(): void {}

  public onSubmit() {
    this.submitted = true;
    const queryParams = {
      token: this.route.snapshot.queryParams.token,
      email: this.route.snapshot.queryParams.email,
    };

    this.authService.resetPassword(queryParams.token, queryParams.email, this.pwd, this.pwdCheck).subscribe({
      next: (result) => {
        setTimeout(() => this.infoService.success(result.message), 1000);
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.infoService.error(error);
      },
    });
  }
}

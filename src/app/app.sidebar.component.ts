import { TokenService } from './mkjServices/authentication/token.service';
import { AuthService } from './mkjServices/authentication/auth.service';
import { UserService } from './mkjServices/authentication/user.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';
import { User } from './mkjServices/authentication/User';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSideBarComponent implements OnInit {
    user: User;

    constructor(public app: AppComponent, public appMain: AppMainComponent,
        private userService: UserService, private authService: AuthService,
        private tokenService: TokenService, private router: Router) {

    }
    ngOnInit(): void {
        this.user = this.userService.getCurrentUser();
    }


    logout() {
        this.userService.onLogout();
        this.authService.logout().subscribe(() => {
            this.tokenService.removeToken();
            this.router.navigate(['login'])
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AuthStateService } from './mkjServices/authentication/auth-state.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSideBarComponent implements OnInit {

    constructor(public app: AppComponent, public appMain: AppMainComponent,
        private authStateService: AuthStateService,
    ) {

    }
    ngOnInit(): void { }


    logout() {
        this.authStateService.setAuthState(false)
    }
}

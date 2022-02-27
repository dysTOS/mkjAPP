import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegistrationCredentials } from '../User';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    isChecking: boolean = false;

    user: RegistrationCredentials = {
        vorname: null,
        zuname: null,
        email: null,
        passwort: null
    }

    constructor(
        public router: Router,
        public authService: AuthService
    ) {

    }

    ngOnInit() { }

    onSubmit() {
        this.isChecking = true;
        this.authService.register(this.user).subscribe(
            result => {
                console.log(result)
            },
            error => {
                console.log(error), this.isChecking = false
            },
            () => {
                this.isChecking = false;
                this.router.navigate(['login']);
            }
        )
    }

}

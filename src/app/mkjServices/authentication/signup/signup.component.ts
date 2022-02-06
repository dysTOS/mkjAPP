import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    user = {
        name: null,
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
        this.authService.register(this.user).subscribe(
            result => {
                console.log(result)
            },
            error => {
                console.log(error);
            },
            () => {
                this.router.navigate(['login']);
            }
        )
    }

}

import { UserService } from 'src/app/mkjServices/authentication/user.service';
import { Component, OnInit } from '@angular/core';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import * as _ from 'lodash';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
    mitglied: Mitglied;

    constructor(private userservice: UserService) { }

    ngOnInit(): void {
        this.userservice.getCurrentMitglied().subscribe({
            next: res => this.mitglied = _.cloneDeep(res)
        })
    }

}

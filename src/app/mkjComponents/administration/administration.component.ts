import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfoService } from './../../mkjServices/info.service';
import { MitgliederService } from './../../mkjServices/mitglieder.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/mkjServices/authentication/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import * as _ from 'lodash';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit, OnDestroy {
    public mitglied: Mitglied;
    private mitgliedSub$: Subscription;
    public mitgliedSaving: boolean = false;

    public activeTabIndex: number = 0;

    constructor(private userservice: UserService, private mitgliederService: MitgliederService,
        private infoService: InfoService, private route: ActivatedRoute, private router: Router, private location: Location) { }

    public ngOnInit(): void {
        this.mitgliedSub$ = this.userservice.getCurrentMitglied().subscribe({
            next: res => this.mitglied = _.cloneDeep(res)
        })
        this.route.params.subscribe({
            next: (param) => {
                if (param?.tab === 'rollen') {
                    this.activeTabIndex = 1;
                }
            }
        })
    }

    public ngOnDestroy(): void {
        this.mitgliedSub$.unsubscribe();
    }

    public updateOwnMitgliedData() {
        this.mitgliedSaving = true;
        this.mitgliederService.updateOwnMitgliedData(this.mitglied).subscribe({
            next: res => {
                this.infoService.success("Daten aktualisiert!");
                this.userservice.setCurrentMitglied(res);
                this.mitgliedSaving = false;
            },
            error: err => {
                this.mitgliedSaving = false;
                this.infoService.error(err)
            }
        })
    }

    public rewriteUrl(tabIndex: number) {
        let baseUrlArr = this.router.url.split('/');
        if (baseUrlArr[baseUrlArr.length - 1] !== 'administration') {
            baseUrlArr = baseUrlArr.slice(0, baseUrlArr.length - 1)
        }
        const baseUrl = baseUrlArr.join('/');
        switch (tabIndex) {
            case 0:
                this.location.replaceState(baseUrl);
                return;
            case 1:
                this.location.replaceState(baseUrl + '/rollen');
                return;
        }
    }

}

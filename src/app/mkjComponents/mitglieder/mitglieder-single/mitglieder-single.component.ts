import { RoleService } from '../../../mkjServices/role.service';
import { Role } from './../../../mkjInterfaces/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MitgliederService } from './../../../mkjServices/mitglieder.service';
import { Component, OnInit } from '@angular/core';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';

@Component({
    selector: 'app-mitglieder-single',
    templateUrl: './mitglieder-single.component.html',
    styleUrls: ['./mitglieder-single.component.scss']
})
export class MitgliederSingleComponent implements OnInit {
    mitglied: Mitglied;
    selectedRoles: Role[];
    allRoles: Role[];
    loading: boolean = false;

    constructor(private mitgliederService: MitgliederService, private roleService: RoleService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.mitgliederService.hasSelectedMitglied()) {
            this.mitglied = this.mitgliederService.getSelectedMitglied();
            this.getRoles(this.mitglied.id);
        }
        else {
            let mitgliedID;
            this.loading = true;
            this.route.params.subscribe(e => { mitgliedID = e.id, this.getRoles(e.id) });
            this.mitgliederService.getSingleMitglied(mitgliedID).subscribe(
                {
                    next: (m) => this.mitglied = m,
                    error: (error) => { },
                    complete: () => this.loading = false
                }
            );
        }
    }

    getRoles(id: number) {
        this.roleService.getAllRoles().subscribe({ next: roles => this.allRoles = roles })
        this.roleService.getRolesForMitglied(id).subscribe({ next: (roles) => this.selectedRoles = roles })
    }

    navigateBack() {
        this.mitgliederService.setSelectedMitglied(null);
        this.router.navigate(['/mitglieder'], { relativeTo: this.route });
    }

}

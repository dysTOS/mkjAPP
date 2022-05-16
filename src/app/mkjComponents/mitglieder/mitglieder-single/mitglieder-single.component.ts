import { InfoService } from './../../../mkjServices/info.service';
import { RoleType } from 'src/app/mkjInterfaces/User';
import { ConfirmationService } from 'primeng/api';
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
    rolesLoading: boolean = false;
    rolesSaving: boolean = false;
    RoleType = RoleType;

    editMitglied: Mitglied;
    editDialogVisible: boolean = false;

    constructor(private mitgliederService: MitgliederService, private roleService: RoleService,
        private confirmationService: ConfirmationService, private router: Router, private route: ActivatedRoute, private infoService: InfoService) { }

    ngOnInit(): void {
        if (this.mitgliederService.hasSelectedMitglied()) {
            this.mitglied = this.mitgliederService.getSelectedMitglied();
            this.getRoles(this.mitglied.user_id);
        }
        else {
            this.loading = true;
            this.route.params.subscribe(e => {
                this.mitgliederService.getSingleMitglied(e.id).subscribe(
                    {
                        next: (m) => {
                            this.mitglied = m;
                            this.getRoles(this.mitglied.user_id)
                        },
                        error: (error) => {
                            this.infoService.error(error);
                        },
                        complete: () => this.loading = false
                    }
                );
            });
        }
    }

    getRoles(id: any) {
        if (!id) return;

        this.rolesLoading = true;
        this.roleService.getAllRoles().subscribe({ next: roles => this.allRoles = roles })
        this.roleService.getUserRoles(id).subscribe({
            next: (roles) => {
                this.selectedRoles = roles
            },
            complete: () => this.rolesLoading = false
        })
    }

    updateRoles() {
        this.rolesSaving = true;
        this.roleService.assignRolesToUser(this.selectedRoles, this.mitglied.user_id).subscribe({
            next: (res) => {
                this.selectedRoles = res;
                this.rolesSaving = false;
                this.infoService.success("Rollen aktualisiert!")
            },
            error: (err) => {
                this.infoService.error(err);
                this.selectedRoles = null;
                this.rolesSaving = false;
            }
        })
    }

    openEditDialog() {
        this.editMitglied = { ...this.mitglied };
        this.editDialogVisible = true;
    }

    cancelEdit() {
        this.editMitglied = null;
        this.editDialogVisible = false;
    }

    saveMitglied() {
        this.mitgliederService.updateMitglied(this.editMitglied).subscribe({
            next: res => {
                this.mitglied = res;
                this.infoService.success('Daten gespeichert!');
                this.editDialogVisible = false
            },
            error: (error) => this.infoService.error(error)

        })
    }

    public deleteMitglied() {
        let name = this.mitglied.vorname + ' ' + this.mitglied.zuname;
        this.confirmationService.confirm({
            header: 'Mitglied ' + name + ' löschen?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.mitgliederService.deleteMitglied(this.mitglied).subscribe({
                    next: (res) => {
                        this.infoService.success('Mitglied ' + name + ' gelöscht!');
                        this.navigateBack();
                    },
                    error: (error) => this.infoService.error(error)
                });
            }
        });
    }

    navigateBack() {
        this.mitgliederService.setSelectedMitglied(null);
        this.router.navigate(['/mitglieder'], { relativeTo: this.route });
    }

}

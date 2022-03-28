import { RoleType } from 'src/app/mkjInterfaces/User';
import { MessageService } from 'primeng/api';
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
    RoleType = RoleType;

    editMitglied: Mitglied;
    editDialogVisible: boolean = false;

    constructor(private mitgliederService: MitgliederService, private roleService: RoleService,
        private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

    ngOnInit(): void {
        if (this.mitgliederService.hasSelectedMitglied()) {
            this.mitglied = this.mitgliederService.getSelectedMitglied();
            this.getRoles(this.mitglied.id);
        }
        else {
            this.loading = true;
            this.route.params.subscribe(e => {
                this.getRoles(e.id)
                this.mitgliederService.getSingleMitglied(e.id).subscribe(
                    {
                        next: (m) => this.mitglied = m,
                        error: (error) => { },
                        complete: () => this.loading = false
                    }
                );
            });
        }
    }

    getRoles(id: number) {
        this.rolesLoading = true;
        this.roleService.getAllRoles().subscribe({ next: roles => this.allRoles = roles })
        this.roleService.getRolesForMitglied(id).subscribe({
            next: (roles) => {
                this.selectedRoles = roles
            },
            complete: () => this.rolesLoading = false
        })
    }

    onRoleChange(event) {
        let newRoles = event.value;
        let attachRole = newRoles.filter(e => !this.selectedRoles.includes(e))
        let detachRole = this.selectedRoles.filter(e => !newRoles.includes(e))
        this.selectedRoles = newRoles;
        if (attachRole[0]) {
            this.roleService.attachRoleToMitglied(this.mitglied.id, attachRole[0].id).subscribe({
                next: (res) => this.messageService.add(
                    { severity: 'success', summary: 'Erfolg', detail: res.message, life: 3000 }),
                error: (error) => this.messageService.add(
                    { severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
            })
        }
        if (detachRole[0]) {
            this.roleService.detachRoleFromMitglied(this.mitglied.id, detachRole[0].id).subscribe({
                next: (res) => this.messageService.add(
                    { severity: 'warn', summary: 'Erfolg', detail: res.message, life: 3000 }),
                error: (error) => this.messageService.add(
                    { severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
            })
        }
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
                this.messageService.add(
                    { severity: 'success', summary: 'Erfolg', detail: 'Daten gespeichert!', life: 3000 });
                this.editDialogVisible = false
            },
            error: (error) => this.messageService.add(
                { severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
        })
    }

    navigateBack() {
        this.mitgliederService.setSelectedMitglied(null);
        this.router.navigate(['/mitglieder'], { relativeTo: this.route });
    }

}

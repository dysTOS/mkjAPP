import { Mitglied } from './../../mkjInterfaces/Mitglied';
import { Router, ActivatedRoute } from '@angular/router';
import { MitgliederService } from './../../mkjServices/mitglieder.service';
import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/mkjInterfaces/User';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-mitglieder',
    templateUrl: './mitglieder.component.html',
    styleUrls: ['./mitglieder.component.scss']
})
export class MitgliederComponent implements OnInit {
    mitglieder: Array<Mitglied>;
    addMitglied: Mitglied;

    loading: boolean = false;
    isAdding: boolean = false;
    editDialogVisible: boolean = false;
    filterDialogVisible: boolean = false;
    RoleType = RoleType;

    constructor(private mitgliederService: MitgliederService,
        private router: Router, private route: ActivatedRoute,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.loadAktiveMitglieder();
    }

    public loadAktiveMitglieder() {
        this.mitglieder = null;
        this.loading = true;
        this.mitgliederService.getAktiveMitglieder().subscribe(
            (res) => { this.mitglieder = res, this.loading = false },
            (error) => { this.loading = false; },
        );
    }

    public loadAllMitglieder() {
        this.mitglieder = null;
        this.loading = true;
        this.mitgliederService.getAllMitglieder().subscribe(
            (res) => { this.mitglieder = res, this.loading = false },
            (error) => { this.loading = false; },
        );
    }

    public navigateSingleMitglied(mitglied: Mitglied) {
        this.mitgliederService.setSelectedMitglied(mitglied);
        this.router.navigate(['../mitglieder/' + mitglied.id], { relativeTo: this.route });
    }

    public saveMitglied() {
        this.isAdding = true;
        this.mitgliederService.createMitglied(this.addMitglied).subscribe({
            next: res => {
                if (res.aktiv) {
                    this.mitglieder.push(res);
                    this.mitglieder.sort((a: Mitglied, b: Mitglied) =>
                        a.zuname.localeCompare(b.zuname))
                }
                this.isAdding = false;
                this.editDialogVisible = false;
                this.messageService.add({
                    severity: 'success', summary: 'Erfolg',
                    detail: 'Miglied ' + res.vorname + ' ' + res.zuname + ' angelegt!'
                })
            },
            error: err => {
                this.isAdding = false;
                this.messageService.add({
                    severity: 'error', summary: 'Fehler',
                    detail: 'Ausrückung konnte nicht aktualisiert werden! ' + err.error.message
                })
            }
        })
    }

    public openEditDialog() {
        this.addMitglied = {};
        this.editDialogVisible = true;
    }

    public cancelAdd() {
        this.editDialogVisible = false;
        this.addMitglied = null;
    }

}

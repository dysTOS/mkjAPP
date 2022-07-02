import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Noten, Notenmappe } from "src/app/mkjInterfaces/Noten";
import { InfoService } from "src/app/mkjServices/info.service";
import { NotenService } from "src/app/mkjServices/noten.service";
import { NotenSucheOutput } from "src/app/mkjUtilities/mkj-notensuche/mkj-notensuche.component";

@Component({
    selector: "app-notenmappen",
    templateUrl: "./notenmappen.component.html",
    styleUrls: ["./notenmappen.component.scss"],
})
export class NotenmappenComponent implements OnInit {
    public notenmappen: Notenmappe[];
    public selectedMappe: Notenmappe;
    public selectedNoten: Noten;
    public verzeichnisNr: string;
    public loading: boolean = false;

    public addDialogVisible: boolean = false;
    public newMappeSubmitted: boolean = false;

    public mappenMenuItems: MenuItem[] = [
        {
            label: "Bearbeiten",
            icon: "pi pi-pencil",
            command: () => (this.addDialogVisible = true),
        },
        {
            label: "Löschen",
            icon: "pi pi-trash",
            command: () => {
                this.deleteNotenmappe(this.selectedMappe);
            },
        },
    ];

    constructor(
        private notenService: NotenService,
        private infoService: InfoService,
        private confirmationService: ConfirmationService
    ) {}

    public ngOnInit(): void {
        this.getNotenmappen();
    }

    public getNotenmappen() {
        this.loading = true;
        this.notenService.getNotenmappen().subscribe({
            next: (res) => {
                this.notenmappen = res;
                this.notenmappen.forEach((e) => this.sortNoten(e));
                this.loading = false;
            },
        });
    }

    public addNewMappe() {
        this.selectedMappe = { noten: [] };
        this.addDialogVisible = true;
    }

    public saveMappe() {
        this.newMappeSubmitted = true;
        if (!this.selectedMappe.name) return;
        this.loading = true;
        if (this.selectedMappe.id) {
            this.notenService.updateNotenmappe(this.selectedMappe).subscribe({
                next: (res) => {
                    const index = this.notenmappen.findIndex(
                        (e) => e.id === res.id
                    );
                    this.notenmappen[index] = res;
                    this.infoService.success(res.name + " aktualisiert!");
                    this.selectedMappe = null;
                    this.loading = false;
                    this.newMappeSubmitted = false;
                    this.addDialogVisible = false;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.selectedMappe = null;
                    this.loading = false;
                    this.addDialogVisible = false;
                },
            });
        } else {
            this.notenService.createNotenmappe(this.selectedMappe).subscribe({
                next: (res) => {
                    this.notenmappen.push(res);
                    this.infoService.success(res.name + " erstellt!");
                    this.selectedMappe = null;
                    this.loading = false;
                    this.newMappeSubmitted = false;
                    this.addDialogVisible = false;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.selectedMappe = null;
                    this.loading = false;
                    this.addDialogVisible = false;
                },
            });
        }
    }

    public deleteNotenmappe(mappe: Notenmappe) {
        this.confirmationService.confirm({
            header: "Notenmappe löschen?",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.notenService.deleteNotenmappe(mappe).subscribe({
                    next: () => {
                        this.notenmappen = this.notenmappen.filter(
                            (val) => val.id !== mappe.id
                        );
                        this.infoService.success("Mappe gelöscht!");
                    },
                    error: (err) => this.infoService.error(err),
                });
            },
        });
    }

    public addNotenToMappe(event: NotenSucheOutput) {
        this.loading = true;
        const noten = event.noten;
        const mappenId = this.selectedMappe.id;
        this.notenService
            .attachNotenToMappe(noten.id, mappenId, event.verzeichnisNr)
            .subscribe({
                next: (res) => {
                    noten.pivot = { verzeichnisNr: event.verzeichnisNr };
                    this.selectedMappe.noten.push(noten);
                    this.sortNoten(this.selectedMappe);
                    this.loading = false;
                    this.selectedNoten = null;
                },
                error: (err) => {
                    this.loading = false;
                    this.infoService.error(err);
                },
            });
    }

    public detachNotenFromMappe(noten: Noten) {
        this.loading = true;
        const mappenId = this.selectedMappe.id;
        this.notenService.detachNotenFromMappe(noten.id, mappenId).subscribe({
            next: (res) => {
                this.selectedMappe.noten = this.selectedMappe.noten.filter(
                    (e) => e.id !== noten.id
                );
                this.loading = false;
            },
            error: (err) => this.infoService.error(err),
        });
    }

    private sortNoten(mappe: Notenmappe) {
        if (mappe.hatVerzeichnis) {
            mappe.noten?.sort((a, b) =>
                a.pivot.verzeichnisNr.localeCompare(b.pivot.verzeichnisNr)
            );
        } else {
            mappe.noten?.sort((a, b) => a.titel.localeCompare(b.titel));
        }
    }
}

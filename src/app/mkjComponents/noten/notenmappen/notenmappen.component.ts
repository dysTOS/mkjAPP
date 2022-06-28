import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Noten, Notenmappe } from "src/app/mkjInterfaces/Noten";
import { InfoService } from "src/app/mkjServices/info.service";
import { NotenService } from "src/app/mkjServices/noten.service";

@Component({
    selector: "app-notenmappen",
    templateUrl: "./notenmappen.component.html",
    styleUrls: ["./notenmappen.component.scss"],
})
export class NotenmappenComponent implements OnInit {
    public notenmappen: Notenmappe[];
    public selectedMappe: Notenmappe;
    public loading: boolean = false;

    public addDialogVisible: boolean = false;
    public newMappeSubmitted: boolean = false;

    public mappenMenuItems: MenuItem[] = [
        {
            label: "Bearbeiten",
            icon: "pi pi-pencil",
            command: () => {},
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
                this.loading = false;
            },
        });
    }

    public addNewMappe() {
        this.selectedMappe = { noten: [] };
        this.addDialogVisible = true;
    }

    public createMappe() {
        this.newMappeSubmitted = true;
        if (!this.selectedMappe.name) return;
        this.loading = true;
        this.notenService.createNotenmappe(this.selectedMappe).subscribe({
            next: (res) => {
                this.notenmappen.push(res);
                this.infoService.success(res.name + " erstellt!");
                this.selectedMappe = null;
                this.loading = false;
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

    public addNotenToMappe(noten: Noten, verzeichnisNr?: string) {
        this.loading = true;
        const notenId = noten.id;
        const mappenId = this.selectedMappe.id;
        this.notenService
            .attachNotenToMappe(notenId, mappenId, verzeichnisNr)
            .subscribe({
                next: (res) => {
                    this.selectedMappe.noten.push(noten);
                    this.loading = false;
                },
            });
    }
}

import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Noten } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { NotenmappenApiService } from "src/app/services/api/notenmappen-api.service";
import { InfoService } from "src/app/services/info.service";
import { NotenSucheOutput } from "src/app/utilities/mkj-notensuche/mkj-notensuche.component";
import { MappeNotenListConfig } from "./mappe-noten-list-config.class";
import { MappeNotenListDatasource } from "./mappe-noten-list-datasource.class";
import { UserService } from "src/app/services/authentication/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "mkj-notenmappe-noten-list",
    templateUrl: "./notenmappe-noten-list.component.html",
})
export class NotenmappeNotenListComponent implements OnChanges {
    @Input()
    public mappenId: string;

    @Input()
    public editMode: boolean = false;

    @Input()
    public indexed: boolean = false;

    public tableLocked: boolean = false;

    public hasAssignPermission: boolean = false;
    public hasSavePermission: boolean = false;

    public readonly PermissionMap = PermissionMap;

    public listConfig = new MappeNotenListConfig();
    public listDatasource: MappeNotenListDatasource;

    constructor(
        private notenmappenApiService: NotenmappenApiService,
        private infoService: InfoService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.hasAssignPermission = this.userService.hasPermission(
            PermissionMap.NOTENMAPPE_ASSIGN
        );
        this.hasSavePermission = this.userService.hasPermission(
            PermissionMap.NOTEN_SAVE
        );
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.indexed) {
            const listconfig = new MappeNotenListConfig();
            if (
                changes.indexed.currentValue == true &&
                this.listConfig.columns[0].header !== "Verzeichnis"
            ) {
                listconfig.columns = [
                    {
                        header: "Verzeichnis",
                        type: "template",
                        templateName: "verzeichnisNrTemplate",
                        styleClass: "w-8rem",
                    },
                    ...this.listConfig.columns,
                ];
            }
            this.listConfig = listconfig;
        }
        if (changes.mappenId) {
            this.setListDatasource();
        }
    }

    public navigateToNoten(noten: Noten): void {
        this.router.navigate(["../../noten/", noten.id], {
            relativeTo: this.route,
        });
    }

    public onRowReorder(noten: Noten[]): void {
        noten.forEach((noten, index) => {
            noten.pivot.orderIndex = index;
        });
        this.syncNotenToMappe(noten);
    }

    public syncNotenToMappe(noten: Noten[]): void {
        this.tableLocked = true;
        this.notenmappenApiService.syncNoten(this.mappenId, noten).subscribe({
            next: (res) => {
                this.setListDatasource();
                this.tableLocked = false;
            },
            error: (err) => {
                this.infoService.error(err);
                this.tableLocked = false;
            },
        });
    }

    private setListDatasource(): void {
        if (this.mappenId) {
            this.listDatasource = new MappeNotenListDatasource(
                this.notenmappenApiService,
                this.mappenId
            );
        } else {
            this.listDatasource = null;
        }
    }

    public addNotenToMappe(event: NotenSucheOutput) {
        this.tableLocked = true;
        const noten = event.noten;
        this.notenmappenApiService
            .attachNotenToMappe(noten.id, this.mappenId, event.verzeichnisNr)
            .subscribe({
                next: (res) => {
                    this.setListDatasource();
                    this.tableLocked = false;
                },
                error: (err) => {
                    this.tableLocked = false;
                    this.infoService.error(err);
                },
            });
    }

    public detachNotenFromMappe(noten: Noten) {
        this.tableLocked = true;
        this.infoService
            .confirmDelete(noten.titel + " aus Mappe löschen?", () =>
                this.notenmappenApiService.detachNotenFromMappe(
                    noten.id,
                    this.mappenId
                )
            )
            .subscribe({
                next: (res) => {
                    this.setListDatasource();
                    this.tableLocked = false;
                },
                error: (err) => {
                    this.tableLocked = false;
                    this.infoService.error(err);
                },
            });
    }
}
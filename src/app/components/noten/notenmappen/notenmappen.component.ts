import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Noten, Notenmappe } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { NotenService } from "src/app/services/noten.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

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
    ];

    constructor(
        private notenService: NotenService,
        private route: ActivatedRoute,
        private router: Router,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Notenmappen";
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                click: () =>
                    this.router.navigate(["neu"], { relativeTo: this.route }),
                label: "Neue Mappe",
                permissions: [PermissionMap.NOTENMAPPE_SAVE],
            },
        ];
    }

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
}

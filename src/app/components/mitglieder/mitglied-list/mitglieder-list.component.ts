import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { InfoService } from "src/app/services/info.service";
import { PermissionMap } from "src/app/models/User";
import { Mitglied } from "src/app/models/Mitglied";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { Table } from "primeng/table";
import { UserService } from "src/app/services/authentication/user.service";
import { AppConfigService } from "src/app/services/app-config.service";

@Component({
    selector: "app-mitglieder",
    templateUrl: "./mitglieder-list.component.html",
    styleUrls: ["./mitglieder-list.component.scss"],
})
export class MitgliederListComponent implements OnInit {
    public mitglieder: Array<Mitglied>;

    public loading: boolean = false;
    public canEdit: boolean = false;

    public mitgliederFilter = [
        {
            name: "Alle ",
            value: "alle",
        },
        { name: "Nur Aktive ", value: "aktive" },
    ];
    public selectedFilter = this.mitgliederFilter[1];

    @ViewChild("mitgliederTable") mitgliederTable: Table;
    @ViewChild("toolbarContentSection") toolbarContentSection: TemplateRef<any>;

    public readonly PermissionMap = PermissionMap;

    constructor(
        private mitgliederService: MitgliederApiService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private infoService: InfoService,
        private toolbarService: MkjToolbarService,
        appconfig: AppConfigService
    ) {
        this.toolbarService.header = appconfig.appNaming.Mitglieder;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-filter",
                click: () => {
                    this.toolbarService.contentSectionExpanded =
                        !this.toolbarService.contentSectionExpanded;
                    this.toolbarService.buttons[0].highlighted =
                        this.toolbarService.contentSectionExpanded;
                },
                highlighted:
                    this.toolbarService.contentSectionExpanded === true,
                label: "Filtern/Suchen",
            },
            {
                icon: "pi pi-plus",
                click: () =>
                    this.router.navigate(["../", "neu"], {
                        relativeTo: this.route,
                    }),
                label: "Neu",
                permissions: [PermissionMap.MITGLIEDER_SAVE],
            },
        ];

        this.canEdit = this.userService.hasPermission(
            PermissionMap.MITGLIEDER_SAVE
        );
    }

    public ngOnInit(): void {
        this.loadAktiveMitglieder();
    }

    public ngAfterViewInit(): void {
        this.toolbarService.contentSectionTemplate = this.toolbarContentSection;
        if (this.mitgliederTable?.filters?.global) {
            this.toolbarService.contentSectionExpanded = true;
        }
    }

    public loadAktiveMitglieder() {
        this.mitglieder = null;
        this.loading = true;
        this.mitgliederService.getAktiveMitglieder().subscribe({
            next: (res) => {
                (this.mitglieder = res), (this.loading = false);
            },
            error: (error) => {
                this.loading = false;
                this.infoService.error(error);
            },
        });
    }

    public loadAllMitglieder() {
        this.mitglieder = null;
        this.loading = true;
        this.mitgliederService.getAllMitglieder().subscribe(
            (res) => {
                (this.mitglieder = res), (this.loading = false);
            },
            (error) => {
                this.loading = false;
            }
        );
    }

    public navigateSingleMitglied(mitglied: Mitglied) {
        this.mitgliederService.setSelectedMitglied(mitglied);
        this.router.navigate(["../" + mitglied.id], {
            relativeTo: this.route,
        });
    }
}

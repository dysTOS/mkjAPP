import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { InfoService } from "src/app/services/info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { PermissionMap } from "src/app/models/User";
import { Mitglied } from "src/app/models/Mitglied";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { Table } from "primeng/table";

@Component({
    selector: "app-mitglieder",
    templateUrl: "./mitglieder-list.component.html",
    styleUrls: ["./mitglieder-list.component.scss"],
})
export class MitgliederListComponent implements OnInit {
    mitglieder: Array<Mitglied>;
    addMitglied: Mitglied;

    loading: boolean = false;
    isAdding: boolean = false;
    editDialogVisible: boolean = false;

    public mitgliederFilter = [
        {
            name: "Alle ",
            value: "alle",
        },
        { name: "Nur Aktive ", value: "aktive" },
    ];
    public selectedFilter = this.mitgliederFilter[1];

    public formGroup: FormGroup;

    @ViewChild("mitgliederTable") mitgliederTable: Table;
    @ViewChild("toolbarContentSection") toolbarContentSection: TemplateRef<any>;

    public readonly PermissionMap = PermissionMap;

    constructor(
        private mitgliederService: MitgliederApiService,
        private router: Router,
        private route: ActivatedRoute,
        private infoService: InfoService,
        private fb: FormBuilder,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Mitglieder";
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
                click: () => this.openEditDialog(),
                label: "Neu",
                permissions: [PermissionMap.MITGLIEDER_SAVE],
            },
        ];
    }

    public ngOnInit(): void {
        this.loadAllMitglieder();
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

    public saveMitglied() {
        this.isAdding = true;
        this.mitgliederService.createMitglied(this.addMitglied).subscribe({
            next: (res) => {
                if (res.aktiv) {
                    this.mitglieder.push(res);
                    this.mitglieder.sort((a: Mitglied, b: Mitglied) =>
                        a.zuname.localeCompare(b.zuname)
                    );
                }
                this.isAdding = false;
                this.editDialogVisible = false;
                this.infoService.success(
                    "Miglied " + res.vorname + " " + res.zuname + " angelegt!"
                );
            },
            error: (err) => {
                this.isAdding = false;
                this.infoService.error(err);
            },
        });
    }

    public openEditDialog() {
        this.formGroup = UtilFunctions.getMitgliedFormGroup(this.fb);
        this.editDialogVisible = true;
    }

    public cancelAdd() {
        this.formGroup.reset();
        this.editDialogVisible = false;
    }
}

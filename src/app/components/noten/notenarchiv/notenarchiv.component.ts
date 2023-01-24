import { ConfirmationService } from "primeng/api";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Noten } from "src/app/models/Noten";
import { Table } from "primeng/table";
import { NotenApiService } from "src/app/services/api/noten-api.service";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { InfoService } from "src/app/services/info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PermissionMap } from "src/app/models/User";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-notenarchiv",
    templateUrl: "./notenarchiv.component.html",
    styleUrls: ["./notenarchiv.component.scss"],
})
export class NotenarchivComponent implements OnInit {
    notenArray: Noten[];
    selectedNoten: Noten[];

    loading: boolean = false;
    isAdding: boolean = false;

    editDialogVisible: boolean = false;

    selectedRow: any;

    public formGroup: FormGroup;

    @ViewChild("notenTable")
    notenTable: Table;

    constructor(
        private notenService: NotenApiService,
        private confirmationService: ConfirmationService,
        private infoService: InfoService,
        private fb: FormBuilder,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Notenarchiv";
        this.toolbarService.backButton = null;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionMap.NOTEN_SAVE],
                click: () => this.openEditDialog(),
            },
        ];
    }

    ngOnInit(): void {
        this.getAllNoten();
    }

    getAllNoten() {
        this.loading = true;
        this.notenService.getAllNoten().subscribe({
            next: (res) => {
                (this.notenArray = res), (this.loading = false);
            },
            error: (err) => {
                this.infoService.error(err), (this.loading = false);
            },
        });
    }

    setFilteredRows(e) {
        this.selectedNoten = e.filteredValue;
    }

    openEditDialog(noten?: Noten) {
        if (noten) {
            this.formGroup = UtilFunctions.getNotenFormGroup(this.fb, noten);
        } else {
            this.formGroup = UtilFunctions.getNotenFormGroup(this.fb);
        }
        this.formGroup.updateValueAndValidity();
        this.editDialogVisible = true;
    }

    cancelEdit() {
        this.editDialogVisible = false;
    }

    saveNoten() {
        this.isAdding = true;
        const editNoten = this.formGroup.getRawValue();
        if (editNoten.id) {
            this.notenService.updateNoten(editNoten).subscribe({
                next: (res) => {
                    let index = UtilFunctions.findIndexById(
                        editNoten.id,
                        this.notenArray
                    );
                    this.notenArray[index] = res;
                    this.notenArray = [...this.notenArray];
                    this.infoService.success(
                        editNoten.titel + " aktualisiert!"
                    );
                    this.editDialogVisible = false;
                    this.isAdding = false;
                },
                error: (error) => {
                    this.isAdding = false;
                    this.infoService.error(error);
                },
            });
        } else {
            this.notenService.createNoten(editNoten).subscribe({
                next: (res) => {
                    this.notenArray.push(res);
                    this.notenArray = [...this.notenArray];
                    this.infoService.success("Noten hinzugefügt!");
                    this.editDialogVisible = false;
                    this.isAdding = false;
                },
                error: (error) => {
                    this.isAdding = false;
                    this.infoService.error(error);
                },
            });
        }
    }

    deleteNoten(noten: Noten) {
        this.confirmationService.confirm({
            header: "Noten löschen?",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.notenService.deleteNoten(noten).subscribe({
                    next: () => {
                        this.notenArray = this.notenArray.filter(
                            (val) => val.id !== noten.id
                        );
                        this.infoService.success("Noten gelöscht!");
                    },
                    error: (err) => this.infoService.error(err),
                });
            },
        });
    }
}

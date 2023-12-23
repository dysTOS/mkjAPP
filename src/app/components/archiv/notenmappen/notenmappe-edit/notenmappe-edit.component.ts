import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Notenmappe } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { NotenmappenApiService } from "src/app/services/api/notenmappen-api.service";
import { InfoService } from "src/app/services/info.service";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "notenmappe-edit",
    templateUrl: "./notenmappe-edit.component.html",
})
export class NotenmappeEditComponent extends AbstractFormComponent<Notenmappe> {
    public readonly Permission = PermissionMap;
    public editMode: boolean = false;

    constructor(
        toolbarService: MkjToolbarService,
        apiService: NotenmappenApiService,
        route: ActivatedRoute,
        router: Router,
        infoService: InfoService
    ) {
        super(toolbarService, apiService, infoService, route, router);

        if (this.getId() === "new") {
            this.editMode = true;
        }
    }

    protected initFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null, Validators.required),
            hatVerzeichnis: new FormControl(false),
            color: new FormControl(null),
        });
    }
    protected getId(): string {
        return this.route.snapshot.params.id;
    }

    protected initToolbar(): void {
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            {
                label: "Mappe bearbeiten",
                icon: "pi pi-pencil",
                hidden: this.getId() === "new",
                click: () => {
                    this.editMode = !this.editMode;
                    this.toolbarService.buttons[0].highlighted = this.editMode;
                },
                permissions: [
                    PermissionMap.NOTENMAPPE_SAVE,
                    PermissionMap.NOTENMAPPE_ASSIGN,
                ],
            },
            {
                label: "Mappe Löschen",
                icon: "pi pi-trash",
                hidden: this.getId() === "new",
                click: () => this.delete(),
                permissions: [PermissionMap.NOTENMAPPE_DELETE],
            },
        ];
    }
}

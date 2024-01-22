import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Noten, NotenGattungMap } from "src/app/models/Noten";
import { PermissionKey } from "src/app/models/User";
import { NotenApiService } from "src/app/services/api/noten-api.service";
import { InfoService } from "src/app/services/info.service";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-noten-editor",
    templateUrl: "./noten-editor.component.html",
    styleUrls: ["./noten-editor.component.scss"],
})
export class NotenEditorComponent extends AbstractFormComponent<Noten> {
    protected navigateBackOnSave = true;
    public readonly GattungOptions = NotenGattungMap;

    constructor(
        toolbarService: MkjToolbarService,
        apiService: NotenApiService,
        infoService: InfoService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(toolbarService, apiService, infoService, route, router);
    }

    protected getId(): string {
        return this.route.snapshot.params.id;
    }

    protected initToolbar(): void {
        this.toolbarService.backButton = true;
        if (this.getId() !== "new") {
            this.toolbarService.header = "Noten bearbeiten";
            this.toolbarService.buttons = [
                {
                    label: "Mappe Löschen",
                    icon: "pi pi-trash",
                    click: () => this.delete(),
                    permissions: [PermissionKey.NOTEN_DELETE],
                },
            ];
        } else {
            this.toolbarService.header = "Neue Noten";
        }
    }

    protected initFormGroup(): FormGroup<any> {
        return new FormGroup({
            titel: new FormControl("", Validators.required),
            komponist: new FormControl(""),
            inventarId: new FormControl(""),
            arrangeur: new FormControl(""),
            verlag: new FormControl(""),
            gattung: new FormControl(""),
            ausgeliehenAb: new FormControl(""),
            ausgeliehenVon: new FormControl(""),
            anmerkungen: new FormControl(""),
            aufbewahrungsort: new FormControl(""),
            links: new FormControl(""),
        });
    }
}

import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Gruppe } from "src/app/models/Gruppe";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-gruppe-details",
    templateUrl: "./gruppe-edit.component.html",
})
export class GruppeEditComponent extends AbstractFormComponent<Gruppe> {
    constructor(
        gruppenService: GruppenApiService,
        toolbarService: MkjToolbarService,
        route: ActivatedRoute,
        router: Router,
        infoService: InfoService
    ) {
        super(toolbarService, gruppenService, infoService, route, router);
    }

    protected initFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null, Validators.required),
            gruppenleiter_mitglied_id: new FormControl(null),
            register: new FormControl(null),
            color: new FormControl(null),
            gruppenleiter: new FormControl(null),
        });
    }
    protected getId(): string {
        return this.route.snapshot.params.id;
    }

    protected initToolbar(): void {
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            {
                label: "Löschen",
                icon: "pi pi-trash",
                hidden: this.getId() === "new",
                click: () => this.delete(),
                permissions: [PermissionMap.GRUPPEN_DELETE],
            },
        ];
    }

    public setGruppenleiter(leiter: Mitglied) {
        this.formGroup.controls.gruppenleiter_mitglied_id.setValue(leiter?.id);
        this.formGroup.controls.gruppenleiter_mitglied_id.markAsDirty();
    }
}

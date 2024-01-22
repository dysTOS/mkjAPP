import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Gruppe } from "src/app/models/Gruppe";
import { PermissionKey } from "src/app/models/User";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliedAutoCompleteConfigiguration } from "src/app/utilities/_autocomplete-configurations/mitglied-autocomplete-config.class";
import { MitgliederListDatasource } from "src/app/utilities/_list-datasources/mitglieder-list-datasource.class";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-gruppe-details",
    templateUrl: "./gruppe-edit.component.html",
    providers: [MitgliederListDatasource],
})
export class GruppeEditComponent extends AbstractFormComponent<Gruppe> {
    public readonly mitgliedAutoCompleteConfig =
        new MitgliedAutoCompleteConfigiguration();

    constructor(
        public mitgliedDatasource: MitgliederListDatasource,
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
                permissions: [PermissionKey.GRUPPEN_DELETE],
            },
        ];
    }
}

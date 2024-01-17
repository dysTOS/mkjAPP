import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UiDropdownOption } from "src/app/interfaces/UiConfigurations";
import { Instrument } from "src/app/models/Instrument";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { InstrumenteApiService } from "src/app/services/api/instrumente-api.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliedAutoCompleteConfigiguration } from "src/app/utilities/_autocomplete-configurations/mitglied-autocomplete-config.class";
import { MitgliederListDatasource } from "src/app/utilities/_list-datasources/mitglieder-list-datasource.class";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-instrumente-editor",
    templateUrl: "./instrumente-editor.component.html",
    styleUrls: ["./instrumente-editor.component.scss"],
    providers: [MitgliederListDatasource],
})
export class InstrumenteEditorComponent
    extends AbstractFormComponent<Instrument>
    implements OnInit
{
    public GruppenMap: UiDropdownOption[];

    public readonly mitgliedAutoCompleteConfig =
        new MitgliedAutoCompleteConfigiguration();

    constructor(
        public readonly mitgliedDatasource: MitgliederListDatasource,
        private gruppenService: GruppenApiService,
        toolbarService: MkjToolbarService,
        apiService: InstrumenteApiService,
        infoService: InfoService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(toolbarService, apiService, infoService, route, router);
    }

    public ngOnInit(): void {
        this.getGruppen();
    }

    private getGruppen() {
        this.gruppenService.getList().subscribe((res) => {
            this.GruppenMap = res.values
                .filter((e) => e.register)
                .map((e) => {
                    return {
                        label: e.name,
                        value: e.id,
                    };
                });
        });
    }

    protected initToolbar(): void {
        this.toolbarService.backButton = true;

        if (this.getId() !== "new") {
            this.toolbarService.header = "Instrument bearbeiten";
            this.toolbarService.buttons = [
                {
                    label: "Instrument Löschen",
                    icon: "pi pi-trash",
                    click: () => this.delete(),
                    permissions: [PermissionMap.INSTRUMENTE_DELETE],
                },
            ];
        } else {
            this.toolbarService.header = "Neues Instrument";
        }
    }
    protected initFormGroup(): FormGroup<any> {
        return new FormGroup({
            marke: new FormControl(null, Validators.required),
            bezeichnung: new FormControl(null, Validators.required),
            anschaffungsdatum: new FormControl(null),
            verkaeufer: new FormControl(null),
            schaeden: new FormControl(null),
            anmerkungen: new FormControl(null),
            aufbewahrungsort: new FormControl(null),
            mitglied_id: new FormControl(null),
            gruppe_id: new FormControl(null),
            gruppe: new FormControl(null),
        });
    }
    protected getId(): string {
        return this.route.snapshot.params.id;
    }
}

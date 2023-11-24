import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Kassabuchung, KassabuchungTyp } from "src/app/models/Kassabuch";
import { KassabuchungenApiService } from "src/app/services/api/kassabuchungen-api.service";
import { InfoService } from "src/app/services/info.service";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { SubSink } from "subsink";

@Component({
    selector: "app-kassabuchung-edit",
    templateUrl: "./kassabuchung-edit.component.html",
    styleUrls: ["./kassabuchung-edit.component.scss"],
})
export class KassabuchungEditComponent extends AbstractFormComponent<Kassabuchung> {
    public readonly typOptions =
        UtilFunctions.getDropdownOptionsFromEnum(KassabuchungTyp);
    private _subSink = new SubSink();

    constructor(
        toolbarService: MkjToolbarService,
        apiService: KassabuchungenApiService,
        infoService: InfoService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(toolbarService, apiService, infoService, route, router);
        this._subSink.add(
            this.formGroup.controls.anschrift.valueChanges.subscribe(
                (anschrift) => {
                    if (anschrift.id) {
                        this.formGroup.controls.anschrift_id.setValue(
                            anschrift.id
                        );
                    } else {
                        this.formGroup.controls.anschrift_id.setValue(null);
                    }
                }
            )
        );
    }

    protected initFormGroup(): FormGroup<any> {
        const buchId = this.route.snapshot.paramMap.get("buchId");
        return new FormGroup(
            {
                id: new FormControl<string>(null),
                typ: new FormControl<KassabuchungTyp>(
                    null,
                    Validators.required
                ),
                nummer: new FormControl<string>(null),
                datum: new FormControl<string>(null, Validators.required),
                anschrift_id: new FormControl<string>(null),
                kassabuch_id: new FormControl<string>(buchId),
                gesamtpreis: new FormControl<number>(null, Validators.required),
                bezahltDatum: new FormControl<string>(null),
                anmerkungen: new FormControl<string>(null),
                positionen: new FormControl<any>(null),
                konditionen: new FormControl<any>(null),
                anschrift: new FormControl(null),
            },
            {
                validators: (group: FormGroup): ValidationErrors | null => {
                    if (
                        !group.controls.anschrift_id.value &&
                        !group.controls.anschrift.value
                    ) {
                        const err = {
                            Anschrift:
                                "Es muss eine existierende Anschrift ausgewählt werden oder eine neue Anschrift angelegt werden.",
                        };
                        return err;
                    }
                    return null;
                },
            }
        );
    }
    protected getId(): string {
        const id = this.route.snapshot.paramMap.get("id");
        return id;
    }
}

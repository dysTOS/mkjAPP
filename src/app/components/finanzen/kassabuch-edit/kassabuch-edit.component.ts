import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Kassabuch } from "src/app/models/Kassabuch";
import { KassabuchApiService } from "src/app/services/api/kassabuch-api.service";
import { InfoService } from "src/app/services/info.service";
import { AbstractFormComponent } from "src/app/utilities/form-components/_abstract-form-component.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-kassabuch-edit",
    templateUrl: "./kassabuch-edit.component.html",
    styleUrls: ["./kassabuch-edit.component.scss"],
})
export class KassabuchEditComponent extends AbstractFormComponent<Kassabuch> {
    constructor(
        toolbarService: MkjToolbarService,
        apiService: KassabuchApiService,
        infoService: InfoService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(toolbarService, apiService, infoService, route, router);
    }

    protected getId(): string {
        const id = this.route.snapshot.paramMap.get("buchId");
        return id;
    }

    protected initFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl<string>(null),
            name: new FormControl<string>(null),
            aktiv: new FormControl<boolean>(false),
            color: new FormControl<string>(null),
            anmerkungen: new FormControl<string>(null),
        });
    }
}

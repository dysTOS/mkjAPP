import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MitgliedGeschlechtMap } from "src/app/models/Mitglied";

@Component({
    selector: "mkj-mitglied-form",
    templateUrl: "./mitglied-form.component.html",
    styleUrls: ["./mitglied-form.component.scss"],
    providers: [],
})
export class MitgliedFormComponent implements OnInit {
    @Input()
    public personalMode: boolean = false;

    @Input()
    public formGroup: FormGroup;

    public readonly MitgliedGeschlechtMap = MitgliedGeschlechtMap;

    constructor() {}

    public ngOnInit(): void {
        if (this.personalMode) {
            this.formGroup?.get("email").disable();
        }
    }
}

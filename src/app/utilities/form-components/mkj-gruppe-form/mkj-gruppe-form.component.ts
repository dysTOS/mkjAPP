import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Mitglied } from "src/app/models/Mitglied";
import { FullNamePipe } from "src/app/pipes/full-name.pipe";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";

@Component({
    selector: "mkj-gruppe-form",
    templateUrl: "./mkj-gruppe-form.component.html",
    styleUrls: ["./mkj-gruppe-form.component.scss"],
    providers: [FullNamePipe],
})
export class MkjGruppeFormComponent {
    private _formGroup: FormGroup;
    @Input()
    public get formGroup(): FormGroup {
        return this._formGroup;
    }
    public set formGroup(value: FormGroup) {
        this._formGroup = value;
        this.gruppenleiter = this.getWrapperFromMitglied(
            value.get("gruppenleiter")?.getRawValue()
        );
    }

    public gruppenleiter: { name: string; mitglied: Mitglied };
    public mitgliederSearchResult: { name: string; mitglied: Mitglied }[];

    constructor(
        private mitgliederService: MitgliederApiService,
        private fullNamePipe: FullNamePipe
    ) {}

    public searchMitglieder(event: any) {
        this.mitgliederService
            .searchMitglieder(event.query)
            .subscribe((data) => {
                this.mitgliederSearchResult = data.map((e) => {
                    return this.getWrapperFromMitglied(e);
                });
            });
    }

    public setGruppenleiter(leiter: Mitglied) {
        this.formGroup.controls.gruppenleiter_mitglied_id.setValue(leiter?.id);
    }

    private getWrapperFromMitglied(mitglied: Mitglied) {
        return {
            mitglied: mitglied,
            name: this.fullNamePipe.transform(mitglied),
        };
    }
}

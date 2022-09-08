import { Component, OnInit } from "@angular/core";
import { Rechnung } from "src/app/interfaces/Rechnung";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-rechnungs-generator",
    templateUrl: "./rechnungs-generator.component.html",
    styleUrls: ["./rechnungs-generator.component.scss"],
})
export class RechnungsGeneratorComponent implements OnInit {
    public rechnung: Rechnung = {
        empfaenger: {},
        datum: null,
        positionen: [],
        gesamtpreis: null,
    };

    public rForm: FormGroup;

    public printDialogVisible: boolean = false;

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            datum: [null, Validators.required],
            gesamtpreis: [null, Validators.compose([Validators.required])],
        });
    }

    public ngOnInit(): void {}

    public onSubmit(any) {
        console.log(any);
    }
}

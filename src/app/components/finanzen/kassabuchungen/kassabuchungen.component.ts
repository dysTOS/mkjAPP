import { Component, OnInit } from "@angular/core";
import { Kassabuchung } from "src/app/models/Kassabuchung";
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from "@angular/forms";

@Component({
    selector: "app-kassabuchungen",
    templateUrl: "./kassabuchungen.component.html",
    styleUrls: ["./kassabuchungen.component.scss"],
})
export class KassabuchComponent implements OnInit {
    public rechnung: Kassabuchung;

    public rForm: UntypedFormGroup;

    public printDialogVisible: boolean = false;

    constructor(private fb: UntypedFormBuilder) {
        this.rForm = fb.group({
            datum: [null, Validators.required],
            gesamtpreis: [null, Validators.compose([Validators.required])],
        });
    }

    public ngOnInit(): void {}

    public onSubmit(any) {
        console.log(any);
        this.printDialogVisible = true;
    }
}

import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { SubSink } from "subsink";

@Component({
    template: ``,
})
export class AbstractEditComponent<T> implements OnInit {
    protected formGroup: UntypedFormGroup;
    public loading: boolean = true;

    protected subSink = new SubSink();

    constructor() {}

    ngOnInit(): void {}
}

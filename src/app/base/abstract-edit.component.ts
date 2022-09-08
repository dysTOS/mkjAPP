import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SubSink } from "subsink";

@Component({
    template: ``,
})
export class AbstractEditComponent<T> implements OnInit {
    protected formGroup: FormGroup;
    public loading: boolean = true;

    protected subSink = new SubSink();

    constructor() {}

    ngOnInit(): void {}
}

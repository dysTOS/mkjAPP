import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControlAccessor } from "../abstract-control-accessor";
import { Anschrift } from "src/app/models/Anschrift";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
} from "@angular/forms";
import { SubSink } from "subsink";
import { AnschriftenApiService } from "src/app/services/api/anschriften-api.service";
import {
    BehaviorSubject,
    debounceTime,
    distinctUntilChanged,
    merge,
    tap,
} from "rxjs";
import { OverlayPanel } from "primeng/overlaypanel";
import { Divider } from "primeng/divider";

@Component({
    selector: "mkj-anschrift-form",
    templateUrl: "./anschrift-form.component.html",
    styleUrls: ["./anschrift-form.component.scss"],
    providers: [controlValueAccessor(AnschriftFormComponent)],
})
export class AnschriftFormComponent extends AbstractControlAccessor<Anschrift> {
    @ViewChild("op")
    private overlayPanel: OverlayPanel;
    @ViewChild("opTarget")
    private opTarget: any;

    public internalFormGroup: FormGroup;
    public suggestions: Anschrift[] = [];

    private _suggesting = new BehaviorSubject<boolean>(false);
    public readonly suggesting$ = this._suggesting.asObservable();

    private _subSink = new SubSink();

    constructor(
        inj: Injector,
        private formBuilder: FormBuilder,
        private apiService: AnschriftenApiService
    ) {
        super(inj);
        this.initFormGroup();
        this._subSink.add(
            this.internalFormGroup.statusChanges.subscribe((status) => {
                this.formControl?.setErrors(this.internalFormGroup.errors);
            }),
            this.value$.subscribe((value) => {
                if (value) {
                    this.internalFormGroup.patchValue(value, {
                        emitEvent: false,
                    });
                } else {
                    this.internalFormGroup.reset();
                }
            }),
            this.internalFormGroup.valueChanges.subscribe((value) => {
                value.id = null;
                this.internalFormGroup.controls.id.patchValue(null, {
                    emitEvent: false,
                });
                this.touch();
                this.change(value);
            }),
            merge(
                this.internalFormGroup.controls.vorname.valueChanges,
                this.internalFormGroup.controls.zuname.valueChanges,
                this.internalFormGroup.controls.firma.valueChanges
            )
                .pipe(
                    tap((_) => (this.suggestions = [])),
                    debounceTime(500),
                    distinctUntilChanged()
                )
                .subscribe((value: string) => {
                    this.getSuggestions(value);
                })
        );
    }

    public setFromSuggestion(anschrift: Anschrift) {
        this.internalFormGroup.patchValue(anschrift, { emitEvent: false });
        this.touch();
        this.change(anschrift);
        this.suggestions = [];
    }

    private getSuggestions(value: string) {
        this._suggesting.next(true);
        this.apiService.search(value).subscribe((anschriften) => {
            this.suggestions = anschriften;
            if (anschriften.length > 0) {
                this.overlayPanel.show(null, this.opTarget);
            }
            this._suggesting.next(false);
        });
    }

    private initFormGroup() {
        this.internalFormGroup = this.formBuilder.group(
            {
                id: [null],
                vorname: [null],
                zuname: [null],
                firma: [null],
                strasse: [null],
                hausnummer: [null],
                plz: [null],
                ort: [null],
                staat: [null],
                email: [null],
                telefonNummer: [null],
            },
            {
                validators: AnschriftValidator,
            }
        );
    }
}

function AnschriftValidator(control: AbstractControl): ValidationErrors | null {
    const vorname = control.get("vorname").value;
    const zuname = control.get("zuname").value;
    const firma = control.get("firma").value;

    if (!vorname && !zuname && !firma) {
        return {
            Anschrift:
                "Entweder Vor- und Zuname oder Firma müssen angegeben werden.",
        };
    }
    if ((!vorname || !zuname) && !firma) {
        return {
            Anschrift:
                "Entweder Vor- und Zuname oder Firma müssen angegeben werden.",
        };
    }

    return null;
}

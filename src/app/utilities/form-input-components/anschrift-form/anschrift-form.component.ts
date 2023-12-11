import { Component, Injector, ViewChild } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validator,
} from "@angular/forms";
import { OverlayPanel } from "primeng/overlaypanel";
import {
    BehaviorSubject,
    debounceTime,
    distinctUntilChanged,
    merge,
    tap,
} from "rxjs";
import { Anschrift } from "src/app/models/Anschrift";
import { controlValidator } from "src/app/providers/control-validator";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { AnschriftenApiService } from "src/app/services/api/anschriften-api.service";
import { SubSink } from "subsink";
import { AbstractControlAccessor } from "../abstract-control-accessor";

@Component({
    selector: "mkj-anschrift-form",
    templateUrl: "./anschrift-form.component.html",
    styleUrls: ["./anschrift-form.component.scss"],
    providers: [
        controlValueAccessor(AnschriftFormComponent),
        controlValidator(AnschriftFormComponent),
    ],
})
export class AnschriftFormComponent
    extends AbstractControlAccessor<Anschrift>
    implements Validator
{
    @ViewChild("op")
    private overlayPanel: OverlayPanel;
    @ViewChild("opTarget")
    private opTarget: any;

    public internalFormGroup: FormGroup;
    public suggestions: Anschrift[] = [];

    private _suggesting = new BehaviorSubject<boolean>(false);
    public readonly suggesting$ = this._suggesting.asObservable();

    constructor(
        inj: Injector,
        private formBuilder: FormBuilder,
        private apiService: AnschriftenApiService
    ) {
        super(inj);
        this.initFormGroup();
        this.subs.add(
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
                    tap((_) => {
                        this.suggestions = [];
                        this.overlayPanel?.hide();
                    }),
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
                this.overlayPanel.show(null, this.opTarget.nativeElement);
            }
            this._suggesting.next(false);
        });
    }

    private initFormGroup() {
        this.internalFormGroup = this.formBuilder.group({
            id: [null],
            vorname: [null],
            zuname: [null],
            firma: [null],
            titelVor: [null],
            titelNach: [null],
            strasse: [null],
            hausnummer: [null],
            plz: [null],
            ort: [null],
            staat: [null],
            email: [null],
            telefonHaupt: [null],
            telefonMobil: [null],
            IBAN: [null],
            BIC: [null],
        });
    }

    validate(control: AbstractControl<any, any>): ValidationErrors {
        const vorname = control?.value?.["vorname"];
        const zuname = control?.value?.["zuname"];
        const firma = control?.value?.["firma"];

        if (!vorname && !zuname && !firma) {
            return {
                Kontrahent:
                    "Zumindest Vor/Zuname oder Firma müssen angegeben werden.",
            };
        }
        if ((!vorname || !zuname) && !firma) {
            return {
                Kontrahent:
                    "Zumindest Vor/Zuname oder Firma müssen angegeben werden.",
            };
        }

        return null;
    }
}

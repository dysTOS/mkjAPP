import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
    selector: "[mkjTemplate]",
})
export class MkjTemplateDirective {
    @Input("mkjTemplate") type: string;

    constructor(public templateRef: TemplateRef<any>) {}
}

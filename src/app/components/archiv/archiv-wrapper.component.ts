import { Component } from "@angular/core";
import { InstrumenteUiService } from "./instrumente/instrumente-ui.service";

@Component({
    template: `<router-outlet></router-outlet>`,
    providers: [InstrumenteUiService],
})
export class ArchivWrapperComponent {
    constructor() {}
}

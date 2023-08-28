import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppMainComponent } from "./app.main.component";
import { MkjAppVersion } from "./configurations/changeLogVersion";

@Component({
    selector: "app-footer",
    template: `
        <div class="footer">
            <div class="card flex justify-content-between">
                <span class="footer-text-left"
                    ><a href="https://www.mk-jainzen.at" target="_blank"></a
                ></span>
                <span class="footer-text-center">
                    {{ appMain.publicTestEnvironment ? "TESTUMGEBUNG" : "" }}
                    <a
                        routerLink="einstellungen/changelog"
                        pTooltip="Change Logs ansehen"
                    >
                        {{ MkjAppVersion }}
                    </a>
                </span>
                <span class="footer-text-right">
                    <!-- <span><a href="https://www.gulaschmusi.at" target="_blank"></a></span> -->
                </span>
            </div>
        </div>
    `,
})
export class AppFooterComponent {
    public MkjAppVersion = MkjAppVersion;

    constructor(
        public appMain: AppMainComponent,
        private router: Router,
        private route: ActivatedRoute
    ) {}
}

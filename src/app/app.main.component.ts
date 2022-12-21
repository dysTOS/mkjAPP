import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    Renderer2,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { first } from "rxjs";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { MenuLabels } from "./services/menu.service";
import { ThemeService } from "./services/theme.service";

@Component({
    selector: "app-main",
    templateUrl: "./app.main.component.html",
})
export class AppMainComponent implements OnInit, AfterViewInit, OnDestroy {
    activeTabIndex: number = MenuLabels.DASHBOARD;

    sidebarActive: boolean;

    topbarMenuActive: boolean;

    sidebarClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: any;

    configActive: boolean;

    configClick: boolean;

    public version = "v0.1";

    public publicTestEnvironment = environment.publictest;

    constructor(
        public renderer: Renderer2,
        public themeService: ThemeService,
        private primengConfig: PrimeNGConfig,
        public app: AppComponent,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.initActiveTabIndex();
    }

    ngAfterViewInit() {
        this.documentClickListener = this.renderer.listen(
            "body",
            "click",
            (event) => {
                if (!this.topbarItemClick) {
                    this.activeTopbarItem = null;
                    this.topbarMenuActive = false;
                }

                if (!this.sidebarClick) {
                    if (this.sidebarActive) {
                        this.initActiveTabIndex();
                        this.sidebarActive = false;
                    }
                }

                if (this.configActive && !this.configClick) {
                    this.configActive = false;
                }

                this.configClick = false;
                this.topbarItemClick = false;
                this.sidebarClick = false;
            }
        );
    }

    onTabClick(event: Event, hasChildren: boolean, enumLabel: number) {
        event.preventDefault();
        if (!hasChildren) {
            this.activeTabIndex = enumLabel;
            this.sidebarActive = false;
            return;
        }

        if (this.activeTabIndex === enumLabel) {
            this.sidebarActive = !this.sidebarActive;
        } else {
            this.activeTabIndex = enumLabel;
            this.sidebarActive = true;
        }
    }

    closeSidebar(event: Event) {
        this.sidebarActive = false;
        event.preventDefault();
    }

    onSidebarClick($event) {
        this.sidebarClick = true;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        event.preventDefault();
    }

    onTopbarItemClick(event, item, topItemClick: boolean) {
        if (topItemClick) {
            this.topbarItemClick = true;
        }
        this.activeTabIndex = item;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
            this.topbarItemClick = false;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    get overlay(): boolean {
        return this.themeService.layoutMode === "overlay";
    }

    private initActiveTabIndex() {
        this.route.firstChild.url.pipe(first()).subscribe((urlSeg) => {
            const first = urlSeg[0]?.path;
            if (!first) {
                this.activeTabIndex = MenuLabels.DASHBOARD;
            } else if (first === "noten") {
                this.activeTabIndex = MenuLabels.NOTEN;
            } else if (first === "ausrueckungen") {
                this.activeTabIndex = MenuLabels.AUSRUECKUNGEN;
            } else if (first === "mitglieder") {
                this.activeTabIndex = MenuLabels.MITGLIEDER;
            } else if (first === "test") {
                this.activeTabIndex = MenuLabels.TEST;
            } else if (first === "einstellungen") {
                this.activeTabIndex = MenuLabels.EINSTELLUNGEN;
            } else if (first === "tools") {
                this.activeTabIndex = MenuLabels.TOOLS;
            }
        });
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }
}

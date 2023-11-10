import { AatestComponent } from "./components/aatest/aatest.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { MkjDashboardComponent } from "./components/mkj-dashboard/mkj-dashboard.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppTimelineDemoComponent } from "./pages/app.timelinedemo.component";
import { AppInvoiceComponent } from "./pages/app.invoice.component";
import { AppHelpComponent } from "./pages/app.help.component";
import { AusrueckungSingleComponent } from "./components/ausrueckungen/ausrueckung-single/ausrueckung-single.component";
import { RouteGuard } from "./guards/route.guard";
import { MitgliederDetailsComponent } from "./components/mitglieder/mitglieder-single/mitglieder-details.component";
import { NotenarchivComponent } from "./components/archiv/noten/notenarchiv/notenarchiv.component";
import { NotenmappenComponent } from "./components/archiv/noten/notenmappen/notenmappen.component";
import { NotenmappeDetailsComponent } from "./components/archiv/noten/notenmappen/notenmappe-details/notenmappe-details.component";
import { RechnungsGeneratorComponent } from "./components/tools/rechnungs-generator/rechnungs-generator.component";
import { ArchivWrapperComponent } from "./components/archiv/archiv-wrapper.component";
import { AusrueckungenWrapperComponent } from "./components/ausrueckungen/ausrueckungen-wrapper.component";
import { environment } from "src/environments/environment";
import { KalenderaboComponent } from "./components/ausrueckungen/kalenderabo/kalenderabo.component";
import { AusrueckungenAktuellComponent } from "./components/ausrueckungen/ausrueckungen-aktuell/ausrueckungen-aktuell.component";
import { GlobalRouteGuard } from "./guards/global-route.guard";
import { AusrueckungEditorComponent } from "./components/ausrueckungen/ausrueckung-editor/ausrueckung-editor.component";
import { EditDeactivateGuard } from "./guards/edit-deactivate.guard";
import { MitgliederWrapperComponent } from "./components/mitglieder/mitglieder-wrapper.component";
import { GruppenOverviewComponent } from "./components/mitglieder/gruppen/gruppen-overview/gruppen-overview.component";
import { MitgliederListComponent } from "./components/mitglieder/mitglied-list/mitglieder-list.component";
import { GruppeDetailsComponent } from "./components/mitglieder/gruppen/gruppe-details/gruppe-details.component";
import { EinstellungenWrapperComponent } from "./components/einstellungen/einstellungen-wrapper.component";
import { MitgliedPersonalEditComponent } from "./components/einstellungen/mitglied-personal-edit/mitglied-personal-edit.component";
import { RollenEditComponent } from "./components/einstellungen/rollen-edit/rollen-edit.component";
import { LokaleEinstellungenComponent } from "./components/einstellungen/lokale-einstellungen/lokale-einstellungen.component";
import { BugReportComponent } from "./components/einstellungen/bug-report/bug-report.component";
import { StatistikOverviewComponent } from "./components/statistik/statistik-overview/statistik-overview.component";
import { NotenEditorComponent } from "./components/archiv/noten/noten-editor/noten-editor.component";
import { InstrumenteOverviewComponent } from "./components/archiv/instrumente/instrumente-overview/instrumente-overview.component";
import { InstrumenteEditorComponent } from "./components/archiv/instrumente/instrumente-editor/instrumente-editor.component";
import { MkjChangeLogsComponent } from "./pages/change-logs/change-logs.component";
import { GlobaleEinstellungenComponent } from "./components/einstellungen/globale-einstellungen/globale-einstellungen.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: "signup", component: SignupComponent },
                { path: "login", component: LoginComponent },
                { path: "error", component: AppErrorComponent },
                { path: "access", component: AppAccessdeniedComponent },
                { path: "notfound", component: AppNotfoundComponent },
                {
                    path: "",
                    redirectTo: environment.prefix,
                    pathMatch: "full",
                },
                {
                    path: environment.prefix,
                    component: AppMainComponent,
                    canActivate: [GlobalRouteGuard],
                    title: environment.appTitle,
                    children: [
                        {
                            path: "dashboard",
                            component: MkjDashboardComponent,
                            title: environment.appTitle + " - DASHBOARD",
                            canActivate: [RouteGuard],
                        },
                        {
                            path: "ausrueckungen",
                            component: AusrueckungenWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " - TERMINE",
                            children: [
                                {
                                    path: "aktuell",
                                    component: AusrueckungenAktuellComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "kalenderabo",
                                    component: KalenderaboComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "neu",
                                    component: AusrueckungEditorComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: ":id",
                                    component: AusrueckungEditorComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: "details/:id",
                                    component: AusrueckungSingleComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "",
                                    redirectTo: "aktuell",
                                    pathMatch: "full",
                                },
                            ],
                        },
                        {
                            path: "mitglieder",
                            component: MitgliederWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  MITGLIEDER",
                            children: [
                                {
                                    path: "liste",
                                    component: MitgliederListComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "gruppen",
                                    component: GruppenOverviewComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "gruppen/:id",
                                    component: GruppeDetailsComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: ":id",
                                    component: MitgliederDetailsComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: "",
                                    redirectTo: "liste",
                                    pathMatch: "full",
                                },
                            ],
                        },
                        {
                            path: "archiv",
                            component: ArchivWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  ARCHIV",
                            children: [
                                {
                                    path: "noten",
                                    component: NotenarchivComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "noten/:id",
                                    component: NotenEditorComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: "mappen",
                                    component: NotenmappenComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "mappen/:id",
                                    component: NotenmappeDetailsComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: "instrumente",
                                    component: InstrumenteOverviewComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "instrumente/:id",
                                    component: InstrumenteEditorComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                            ],
                        },

                        {
                            path: "statistik",
                            component: StatistikOverviewComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  STATISTIKEN",
                        },
                        {
                            path: "tools/rechnungsgenerator",
                            component: RechnungsGeneratorComponent,
                            canActivate: [RouteGuard],
                        },
                        {
                            path: "einstellungen",
                            component: EinstellungenWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  EINSTELLUNGEN",

                            children: [
                                {
                                    path: "mitgliedsdaten",
                                    component: MitgliedPersonalEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                },
                                {
                                    path: "rollen",
                                    component: RollenEditComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "lokal",
                                    component: LokaleEinstellungenComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "global",
                                    component: GlobaleEinstellungenComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "bugreport",
                                    component: BugReportComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "changelog",
                                    component: MkjChangeLogsComponent,
                                    canActivate: [RouteGuard],
                                },
                            ],
                        },
                        {
                            path: "test",
                            component: AatestComponent,
                            canActivate: [RouteGuard],
                        },
                        // BARCELONA THEME STUFF-------------------------------------------------------------------------------------------------------------------------------

                        {
                            path: "pages/timeline",
                            component: AppTimelineDemoComponent,
                        },
                        {
                            path: "pages/invoice",
                            component: AppInvoiceComponent,
                        },
                        { path: "pages/help", component: AppHelpComponent },

                        {
                            path: "",
                            redirectTo: "dashboard",
                            pathMatch: "full",
                        },
                        {
                            path: "noaccess",
                            component: AppAccessdeniedComponent,
                        },
                        { path: "**", component: AppNotfoundComponent },
                    ],
                },
                { path: "**", redirectTo: "/notfound" },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

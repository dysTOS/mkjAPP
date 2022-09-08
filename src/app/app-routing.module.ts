import { MitgliedPersonalEditComponent } from "./components/einstellungen/mitglied-personal-edit/mitglied-personal-edit.component";
import { RollenEditComponent } from "./components/einstellungen/rollen-edit/rollen-edit.component";
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
import { AuthGuardService } from "./services/authentication/auth-guard.service";
import { MitgliederSingleComponent } from "./components/mitglieder/mitglieder-single/mitglieder-single.component";
import { NotenarchivComponent } from "./components/noten/notenarchiv/notenarchiv.component";
import { NotenmappenComponent } from "./components/noten/notenmappen/notenmappen.component";
import { RechnungsGeneratorComponent } from "./components/tools/rechnungs-generator/rechnungs-generator.component";
import { LokaleEinstellungenComponent } from "./components/einstellungen/lokale-einstellungen/lokale-einstellungen.component";
import { NotenWrapperComponent } from "./components/noten/noten-wrapper.component";
import { AusrueckungenWrapperComponent } from "./components/ausrueckungen/ausrueckungen-wrapper.component";
import { environment } from "src/environments/environment";
import { KalenderaboComponent } from "./components/ausrueckungen/kalenderabo/kalenderabo.component";
import { AusrueckungenAktuellComponent } from "./components/ausrueckungen/ausrueckungen-aktuell/ausrueckungen-aktuell.component";
import { AusrueckungenArchivComponent } from "./components/ausrueckungen/ausrueckungen-archiv/ausrueckungen-archiv.component";
import { MitgliederComponent } from "./components/mitglieder/mitglieder.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: environment.filePrefix,
                    component: AppMainComponent,
                    canActivate: [AuthGuardService],
                    children: [
                        {
                            path: "dashboard",
                            component: MkjDashboardComponent,
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: "ausrueckungen",
                            component: AusrueckungenWrapperComponent,
                            canActivate: [AuthGuardService],
                            children: [
                                {
                                    path: "aktuell",
                                    component: AusrueckungenAktuellComponent,
                                    canActivate: [AuthGuardService],
                                },
                                {
                                    path: "archiv",
                                    component: AusrueckungenArchivComponent,
                                    canActivate: [AuthGuardService],
                                },
                                {
                                    path: "kalenderabo",
                                    component: KalenderaboComponent,
                                    canActivate: [AuthGuardService],
                                },
                                {
                                    path: ":id",
                                    component: AusrueckungSingleComponent,
                                    canActivate: [AuthGuardService],
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
                            component: MitgliederComponent,
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: "mitglieder/:id",
                            component: MitgliederSingleComponent,
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: "noten",
                            component: NotenWrapperComponent,
                            canActivate: [AuthGuardService],
                            children: [
                                {
                                    path: "archiv",
                                    component: NotenarchivComponent,
                                    canActivate: [AuthGuardService],
                                },
                                {
                                    path: "mappen",
                                    component: NotenmappenComponent,
                                    canActivate: [AuthGuardService],
                                },
                            ],
                        },

                        {
                            path: "tools/rechnungsgenerator",
                            component: RechnungsGeneratorComponent,
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: "einstellungen/mitgliedsdaten",
                            component: MitgliedPersonalEditComponent,
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: "einstellungen/rollen",
                            component: RollenEditComponent,
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: "einstellungen/lokal",
                            component: LokaleEinstellungenComponent,
                            canActivate: [AuthGuardService],
                        },

                        {
                            path: "test",
                            component: AatestComponent,
                            canActivate: [AuthGuardService],
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
                        { path: "**", component: AppNotfoundComponent },
                    ],
                },
                { path: "error", component: AppErrorComponent },
                { path: "access", component: AppAccessdeniedComponent },
                { path: "notfound", component: AppNotfoundComponent },
                { path: "signup", component: SignupComponent },
                { path: "login", component: LoginComponent },
                {
                    path: "",
                    redirectTo: environment.filePrefix,
                    pathMatch: "full",
                },
                { path: "**", redirectTo: "/notfound" },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

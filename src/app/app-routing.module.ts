import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";
import { AppMainComponent } from "./app.main.component";
import { AatestComponent } from "./components/aatest/aatest.component";
import { AnschriftEditComponent } from "./components/anschriften/anschriften-edit/anschriften-edit.component";
import { InstrumenteEditorComponent } from "./components/archiv/instrumente/instrumente-editor/instrumente-editor.component";
import { InstrumenteOverviewComponent } from "./components/archiv/instrumente/instrumente-overview/instrumente-overview.component";
import { NotenEditorComponent } from "./components/archiv/noten/noten-editor/noten-editor.component";
import { NotenOverviewComponent } from "./components/archiv/noten/noten-overview/noten-overview.component";
import { NotenmappeEditComponent } from "./components/archiv/notenmappen/notenmappe-edit/notenmappe-edit.component";
import { NotenmappenOverviewComponent } from "./components/archiv/notenmappen/notenmappen-overview/notenmappen-overview.component";
import { GlobaleEinstellungenComponent } from "./components/einstellungen/globale-einstellungen/globale-einstellungen.component";
import { LokaleEinstellungenComponent } from "./components/einstellungen/lokale-einstellungen/lokale-einstellungen.component";
import { MitgliedPersonalEditComponent } from "./components/einstellungen/mitglied-personal-edit/mitglied-personal-edit.component";
import { RollenEditComponent } from "./components/einstellungen/rollen-edit/rollen-edit.component";
import { KassabuchDetailsComponent } from "./components/finanzen/kassabuch-details/kassabuch-details.component";
import { KassabuchEditComponent } from "./components/finanzen/kassabuch-edit/kassabuch-edit.component";
import { KassabuchungEditComponent } from "./components/finanzen/kassabuchung-edit/kassabuchung-edit.component";
import { KassabuecherComponent } from "./components/finanzen/kassabuecher-overview/kassabuecher-overview.component";
import { GruppeEditComponent } from "./components/gruppen/gruppe-edit/gruppe-edit.component";
import { GruppenOverviewComponent } from "./components/gruppen/gruppen-overview/gruppen-overview.component";
import { MitgliederOverviewComponent } from "./components/mitglieder/mitglied-overview/mitglieder-overview.component";
import { MitgliederEditComponent } from "./components/mitglieder/mitglieder-edit/mitglieder-edit.component";
import { MkjDashboardComponent } from "./components/mkj-dashboard/mkj-dashboard.component";
import { RouterOutletWrapperComponent } from "./components/router-outlet-wrapper.component";
import { StatistikOverviewComponent } from "./components/statistik/statistik-overview/statistik-overview.component";
import { KalenderaboComponent } from "./components/termine/kalenderabo/kalenderabo.component";
import { TerminDetailsComponent } from "./components/termine/termin-details/termin-details.component";
import { TerminEditComponent } from "./components/termine/termin-edit/termin-edit.component";
import { TermineOverviewComponent } from "./components/termine/termine-overview/termine-overview.component";
import { EditDeactivateGuard } from "./guards/edit-deactivate.guard";
import { GlobalRouteGuard } from "./guards/global-route.guard";
import { RouteGuard } from "./guards/route.guard";
import { PermissionKey } from "./models/User";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppHelpComponent } from "./pages/app.help.component";
import { AppInvoiceComponent } from "./pages/app.invoice.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { MkjChangeLogsComponent } from "./pages/change-logs/change-logs.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { AnschriftenOverviewComponent } from "./components/anschriften/anschriften-overview/anschriften-overview.component";
import { MkjRechnungComponent } from "./utilities/mkj-rechnung/mkj-rechnung.component";

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
                            path: "termine",
                            component: RouterOutletWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " - TERMINE",
                            data: {
                                permissions: [PermissionKey.TERMIN_READ],
                            },
                            children: [
                                {
                                    path: "liste",
                                    component: TermineOverviewComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "kalenderabo",
                                    component: KalenderaboComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: ":id",
                                    component: TerminEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.TERMIN_SAVE,
                                        ],
                                    },
                                },
                                {
                                    path: "details/:id",
                                    component: TerminDetailsComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "",
                                    redirectTo: "liste",
                                    pathMatch: "full",
                                },
                            ],
                        },
                        {
                            path: "mitglieder",
                            component: RouterOutletWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  MITGLIEDER",
                            data: {
                                permissions: [PermissionKey.MITGLIEDER_READ],
                            },
                            children: [
                                {
                                    path: "gruppen",
                                    component: GruppenOverviewComponent,
                                    canActivate: [RouteGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.GRUPPEN_READ,
                                        ],
                                    },
                                },
                                {
                                    path: "gruppen/:id",
                                    component: GruppeEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.GRUPPEN_SAVE,
                                        ],
                                    },
                                },
                                {
                                    path: "liste",
                                    component: MitgliederOverviewComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: ":id",
                                    component: MitgliederEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.MITGLIEDER_SAVE,
                                        ],
                                    },
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
                            component: RouterOutletWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  ARCHIV",
                            children: [
                                {
                                    path: "noten",
                                    component: NotenOverviewComponent,
                                    canActivate: [RouteGuard],
                                    data: {
                                        permissions: [PermissionKey.NOTEN_READ],
                                    },
                                },
                                {
                                    path: "noten/:id",
                                    component: NotenEditorComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [PermissionKey.NOTEN_SAVE],
                                    },
                                },
                                {
                                    path: "mappen",
                                    component: NotenmappenOverviewComponent,
                                    canActivate: [RouteGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.NOTENMAPPE_READ,
                                        ],
                                    },
                                },
                                {
                                    path: "mappen/:id",
                                    component: NotenmappeEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.NOTENMAPPE_SAVE,
                                        ],
                                    },
                                },
                                {
                                    path: "instrumente",
                                    component: InstrumenteOverviewComponent,
                                    canActivate: [RouteGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.INSTRUMENTE_READ,
                                        ],
                                    },
                                },
                                {
                                    path: "instrumente/:id",
                                    component: InstrumenteEditorComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.INSTRUMENTE_SAVE,
                                        ],
                                    },
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
                            path: "finanzen",
                            component: RouterOutletWrapperComponent,
                            canActivate: [RouteGuard],
                            title: environment.appTitle + " -  FINANZEN",
                            data: {
                                permissions: [PermissionKey.KASSABUCH_READ],
                            },
                            children: [
                                {
                                    path: "list",
                                    component: KassabuecherComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "buch/:buchId",
                                    component: KassabuchEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.KASSABUCH_SAVE,
                                        ],
                                    },
                                },
                                {
                                    path: "details/:buchId",
                                    component: KassabuchDetailsComponent,
                                    canActivate: [RouteGuard],
                                },
                                {
                                    path: "rechnung/:id",
                                    component: MkjRechnungComponent,
                                    canActivate: [RouteGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.KASSABUCHUNG_SAVE,
                                        ],
                                    },
                                },
                                {
                                    path: "details/:buchId/:id",
                                    component: KassabuchungEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.KASSABUCHUNG_SAVE,
                                        ],
                                    },
                                },
                                {
                                    path: "adressen",
                                    component: AnschriftenOverviewComponent,
                                    canActivate: [RouteGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.ANSCHRIFTEN_READ,
                                        ],
                                    },
                                },
                                {
                                    path: "adressen/:id",
                                    component: AnschriftEditComponent,
                                    canActivate: [RouteGuard],
                                    canDeactivate: [EditDeactivateGuard],
                                    data: {
                                        permissions: [
                                            PermissionKey.ANSCHRIFTEN_SAVE,
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            path: "einstellungen",
                            component: RouterOutletWrapperComponent,
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
                                    data: {
                                        permissions: [
                                            PermissionKey.USER_DELETE,
                                        ],
                                    },
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
                                    data: {
                                        permissions: [
                                            PermissionKey.USER_DELETE,
                                        ],
                                    },
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
                            data: {
                                permissions: [PermissionKey.USER_DELETE],
                            },
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

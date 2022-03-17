import { NotenarchivComponent } from './mkjComponents/notenarchiv/notenarchiv.component';
import { AdministrationComponent } from './mkjComponents/administration/administration.component';
import { MitgliederComponent } from './mkjComponents/mitglieder/mitglieder.component';
import { LoginComponent } from './mkjServices/authentication/login/login.component';
import { SignupComponent } from './mkjServices/authentication/signup/signup.component';
import { MkjDashboardComponent } from './mkjComponents/mkj-dashboard/mkj-dashboard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { InvalidStateDemoComponent } from './demo/view/invalidstatedemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
import { DisplayComponent } from './utilities/display.component';
import { ElevationComponent } from './utilities/elevation.component';
import { FlexboxComponent } from './utilities/flexbox.component';
import { GridComponent } from './utilities/grid.component';
import { IconsComponent } from './utilities/icons.component';
import { WidgetsComponent } from './utilities/widgets.component';
import { SpacingComponent } from './utilities/spacing.component';
import { TypographyComponent } from './utilities/typography.component';
import { TextComponent } from './utilities/text.component';
import { AppCrudComponent } from './pages/app.crud.component';
import { AppCalendarComponent } from './pages/app.calendar.component';
import { AppTimelineDemoComponent } from './pages/app.timelinedemo.component';
import { AppInvoiceComponent } from './pages/app.invoice.component';
import { AppHelpComponent } from './pages/app.help.component';
import { AusrueckungenComponent } from './mkjComponents/ausrueckungen/ausrueckungen.component';
import { AusrueckungSingleComponent } from './mkjComponents/ausrueckungen/ausrueckung-single/ausrueckung-single.component';
import {
    AuthGuardService
} from './mkjServices/authentication/auth-guard.service'
import { MitgliederSingleComponent } from './mkjComponents/mitglieder/mitglieder-single/mitglieder-single.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: '', component: MkjDashboardComponent, canActivate: [AuthGuardService] },
                    { path: 'ausrueckungen', component: AusrueckungenComponent, canActivate: [AuthGuardService] },
                    { path: 'ausrueckung/:id', component: AusrueckungSingleComponent, canActivate: [AuthGuardService] },
                    { path: 'mitglieder', component: MitgliederComponent, canActivate: [AuthGuardService] },
                    { path: 'mitglieder/:id', component: MitgliederSingleComponent, canActivate: [AuthGuardService] },
                    { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuardService] },
                    { path: 'notenarchiv', component: NotenarchivComponent, canActivate: [AuthGuardService] },

                    { path: 'dashboarddemo', component: DashboardDemoComponent },
                    { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
                    { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
                    { path: 'uikit/invalidstate', component: InvalidStateDemoComponent },
                    { path: 'uikit/input', component: InputDemoComponent },
                    { path: 'uikit/button', component: ButtonDemoComponent },
                    { path: 'uikit/table', component: TableDemoComponent },
                    { path: 'uikit/list', component: ListDemoComponent },
                    { path: 'uikit/tree', component: TreeDemoComponent },
                    { path: 'uikit/panel', component: PanelsDemoComponent },
                    { path: 'uikit/overlay', component: OverlaysDemoComponent },
                    { path: 'uikit/media', component: MediaDemoComponent },
                    { path: 'uikit/menu', component: MenusDemoComponent },
                    { path: 'uikit/message', component: MessagesDemoComponent },
                    { path: 'uikit/misc', component: MiscDemoComponent },
                    { path: 'uikit/charts', component: ChartsDemoComponent },
                    { path: 'uikit/file', component: FileDemoComponent },
                    { path: 'utilities/display', component: DisplayComponent },
                    { path: 'utilities/elevation', component: ElevationComponent },
                    { path: 'utilities/flexbox', component: FlexboxComponent },
                    { path: 'utilities/grid', component: GridComponent },
                    { path: 'utilities/icons', component: IconsComponent },
                    { path: 'utilities/widgets', component: WidgetsComponent },
                    { path: 'utilities/spacing', component: SpacingComponent },
                    { path: 'utilities/typography', component: TypographyComponent },
                    { path: 'utilities/text', component: TextComponent },
                    { path: 'pages/crud', component: AppCrudComponent },
                    { path: 'pages/calendar', component: AppCalendarComponent },
                    { path: 'pages/timeline', component: AppTimelineDemoComponent },
                    { path: 'pages/invoice', component: AppInvoiceComponent },
                    { path: 'pages/help', component: AppHelpComponent },
                    { path: 'pages/empty', component: EmptyDemoComponent },
                    { path: 'documentation', component: DocumentationComponent }
                ]
            },
            { path: 'error', component: AppErrorComponent },
            { path: 'access', component: AppAccessdeniedComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'login', component: LoginComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

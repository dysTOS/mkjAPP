import { AuthGuardService } from "./services/authentication/auth-guard.service";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de-AT";
import { ServiceWorkerModule } from "@angular/service-worker";

// PrimeNG Components for demos
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "@fullcalendar/angular";
import { GalleriaModule } from "primeng/galleria";
import { InplaceModule } from "primeng/inplace";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";

// Application Components
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { AppSideBarComponent } from "./app.sidebar.component";
import { AppTopbarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";
import { AppTimelineDemoComponent } from "./pages/app.timelinedemo.component";
import { AppInvoiceComponent } from "./pages/app.invoice.component";
import { AppHelpComponent } from "./pages/app.help.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";
import { ConfirmationService, MessageService } from "primeng/api";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// MKJ
import { MenuService } from "./services/menu.service";
import { AusrueckungSingleComponent } from "./components/ausrueckungen/ausrueckung-single/ausrueckung-single.component";
import { MkjDatePipe } from "./pipes/mkj-date.pipe";
import { MkjDashboardComponent } from "./components/mkj-dashboard/mkj-dashboard.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { MitgliederSingleComponent } from "./components/mitglieder/mitglieder-single/mitglieder-single.component";
import { VisibleForPermissionDirective } from "./utilities/visible-for-permission.directive";
import { MitgliedEditorComponent } from "./components/mitglieder/mitglied-editor/mitglied-editor.component";
import { MkjToolbarComponent } from "./utilities/mkj-toolbar/mkj-toolbar.component";
import { AusrueckungEditorComponent } from "./components/ausrueckungen/ausrueckung-editor/ausrueckung-editor.component";
import { RollenEditComponent } from "./components/einstellungen/rollen-edit/rollen-edit.component";
import { MkjTextTransformPipe } from "./pipes/mkj-text-transform.pipe";
import { MkjDisplayFieldComponent } from "./utilities/mkj-display-field/mkj-display-field.component";
import { AatestComponent } from "./components/aatest/aatest.component";
import { MitgliedPersonalEditComponent } from "./components/einstellungen/mitglied-personal-edit/mitglied-personal-edit.component";
import { MkjRechnungComponent } from "./utilities/mkj-rechnung/mkj-rechnung.component";
import { NotenEditorComponent } from "./components/noten/noten-editor/noten-editor.component";
import { NotenarchivComponent } from "./components/noten/notenarchiv/notenarchiv.component";
import { NotenmappenComponent } from "./components/noten/notenmappen/notenmappen.component";
import { RechnungsGeneratorComponent } from "./components/tools/rechnungs-generator/rechnungs-generator.component";
import { MkjNotensucheComponent } from "./utilities/mkj-notensuche/mkj-notensuche.component";
import { environment } from "src/environments/environment";
import { LokaleEinstellungenComponent } from "./components/einstellungen/lokale-einstellungen/lokale-einstellungen.component";
import { NotenWrapperComponent } from "./components/noten/noten-wrapper.component";
import { AusrueckungenWrapperComponent } from "./components/ausrueckungen/ausrueckungen-wrapper.component";
import { KalenderaboComponent } from "./components/ausrueckungen/kalenderabo/kalenderabo.component";
import { AusrueckungenAktuellComponent } from "./components/ausrueckungen/ausrueckungen-aktuell/ausrueckungen-aktuell.component";
import { AusrueckungenArchivComponent } from "./components/ausrueckungen/ausrueckungen-archiv/ausrueckungen-archiv.component";
import { AuthInterceptor } from "./services/authentication/auth-interceptor.component";
import { UserService } from "./services/authentication/user.service";
import { ThemeService } from "./services/theme.service";
import { MitgliederComponent } from "./components/mitglieder/mitglieder.component";
import { AbstractEditComponent } from "./base/abstract-edit.component";
import { MkjContentLoaderComponent } from "./utilities/mkj-content-loader/mkj-content-loader.component";
import { MkjTemplateDirective } from "./utilities/mkj-template.directive";

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
]);

registerLocaleData(localeDe);

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TimelineModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
        }),
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppSideBarComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        AusrueckungenWrapperComponent,
        NotenWrapperComponent,
        AppTimelineDemoComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AusrueckungSingleComponent,
        MkjDatePipe,
        MkjDashboardComponent,
        SignupComponent,
        LoginComponent,
        MitgliederComponent,
        MitgliederSingleComponent,
        NotenarchivComponent,
        VisibleForPermissionDirective,
        MitgliedEditorComponent,
        NotenEditorComponent,
        MkjToolbarComponent,
        AusrueckungEditorComponent,
        RollenEditComponent,
        MkjTextTransformPipe,
        MkjDisplayFieldComponent,
        AatestComponent,
        MitgliedPersonalEditComponent,
        MkjRechnungComponent,
        NotenmappenComponent,
        RechnungsGeneratorComponent,
        MkjNotensucheComponent,
        LokaleEinstellungenComponent,
        KalenderaboComponent,
        AusrueckungenAktuellComponent,
        AusrueckungenArchivComponent,
        AbstractEditComponent,
        MkjContentLoaderComponent,
        MkjTemplateDirective,
    ],
    providers: [
        MenuService,
        ConfirmationService,
        DatePipe,
        AuthGuardService,
        MessageService,
        MkjDatePipe,
        {
            provide: APP_INITIALIZER,
            useFactory: (
                userService: UserService,
                themeService: ThemeService
            ) => {
                return () => userService.initializeUserData();
            },
            deps: [UserService, ThemeService],
            multi: true,
        },
        { provide: LOCALE_ID, useValue: "de-AT" },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

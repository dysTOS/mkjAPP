import { DatePipe, registerLocaleData } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import localeDe from "@angular/common/locales/de-AT";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppRoutingModule } from "./app-routing.module";
import { RouteGuard } from "./guards/route.guard";

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
import { ColorPickerModule } from "primeng/colorpicker";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
// import { FullCalendarModule } from "@fullcalendar/angular";
import { GalleriaModule } from "primeng/galleria";
import { InplaceModule } from "primeng/inplace";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
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
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
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
import { ConfirmationService, MessageService } from "primeng/api";
import { AppComponent } from "./app.component";
import { AppFooterComponent } from "./app.footer.component";
import { AppMainComponent } from "./app.main.component";
import { AppSideBarComponent } from "./app.sidebar.component";
import { AppTopbarComponent } from "./app.topbar.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppHelpComponent } from "./pages/app.help.component";
import { AppInvoiceComponent } from "./pages/app.invoice.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppTimelineDemoComponent } from "./pages/app.timelinedemo.component";

// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// MKJ
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { environment } from "src/environments/environment";
import { AatestComponent } from "./components/aatest/aatest.component";
import { TestApiComponent } from "./components/aatest/test-api/test-api.component";
import { ArchivWrapperComponent } from "./components/archiv/archiv-wrapper.component";
import { InstrumenteEditorComponent } from "./components/archiv/instrumente/instrumente-editor/instrumente-editor.component";
import { InstrumenteOverviewComponent } from "./components/archiv/instrumente/instrumente-overview/instrumente-overview.component";
import { NotenCardComponent } from "./components/archiv/noten/noten-card/noten-card.component";
import { NotenEditorComponent } from "./components/archiv/noten/noten-editor/noten-editor.component";
import { NotenarchivComponent } from "./components/archiv/noten/notenarchiv/notenarchiv.component";
import { NotenmappeDetailsComponent } from "./components/archiv/noten/notenmappen/notenmappe-details/notenmappe-details.component";
import { NotenmappenComponent } from "./components/archiv/noten/notenmappen/notenmappen.component";
import { AusrueckungEditorComponent } from "./components/ausrueckungen/ausrueckung-editor/ausrueckung-editor.component";
import { AnwesenheitsListeComponent } from "./components/ausrueckungen/ausrueckung-single/anwesenheits-liste/anwesenheits-liste.component";
import { AusrueckungSingleComponent } from "./components/ausrueckungen/ausrueckung-single/ausrueckung-single.component";
import { TeilnahmenOverviewComponent } from "./components/ausrueckungen/ausrueckung-single/teilnahmen-overview/teilnahmen-overview.component";
import { AusrueckungenAktuellComponent } from "./components/ausrueckungen/ausrueckungen-aktuell/ausrueckungen-aktuell.component";
import { AusrueckungenWrapperComponent } from "./components/ausrueckungen/ausrueckungen-wrapper.component";
import { KalenderaboComponent } from "./components/ausrueckungen/kalenderabo/kalenderabo.component";
import { TerminCardComponent } from "./components/ausrueckungen/termin-card/termin-card.component";
import { BugReportComponent } from "./components/einstellungen/bug-report/bug-report.component";
import { EinstellungenWrapperComponent } from "./components/einstellungen/einstellungen-wrapper.component";
import { LokaleEinstellungenComponent } from "./components/einstellungen/lokale-einstellungen/lokale-einstellungen.component";
import { MitgliedPersonalEditComponent } from "./components/einstellungen/mitglied-personal-edit/mitglied-personal-edit.component";
import { RollenEditComponent } from "./components/einstellungen/rollen-edit/rollen-edit.component";
import { GruppeDetailsComponent } from "./components/mitglieder/gruppen/gruppe-details/gruppe-details.component";
import { GruppenOverviewComponent } from "./components/mitglieder/gruppen/gruppen-overview/gruppen-overview.component";
import { MitgliederListComponent } from "./components/mitglieder/mitglied-list/mitglieder-list.component";
import { MitgliedRolesPickerComponent } from "./components/mitglieder/mitglieder-single/mitglied-roles-picker/mitglied-roles-picker.component";
import { MitgliederDetailsComponent } from "./components/mitglieder/mitglieder-single/mitglieder-details.component";
import { MitgliederWrapperComponent } from "./components/mitglieder/mitglieder-wrapper.component";
import { MkjDashboardComponent } from "./components/mkj-dashboard/mkj-dashboard.component";
import { NextGeburtstagComponent } from "./components/mkj-dashboard/next-geburtstag/next-geburtstag.component";
import { NextTerminComponent } from "./components/mkj-dashboard/next-termin/next-termin.component";
import { StatistikGruppenTermineComponent } from "./components/statistik/components/statistik-gruppen-termine/statistik-gruppen-termine.component";
import { StatistikMitgliederGeschlechtComponent } from "./components/statistik/components/statistik-mitglieder-geschlecht/statistik-mitglieder-geschlecht.component";
import { StatistikMitgliederComponent } from "./components/statistik/components/statistik-mitglieder/statistik-mitglieder.component";
import { StatistikNotenComponent } from "./components/statistik/components/statistik-noten/statistik-noten.component";
import { StatistikTermineComponent } from "./components/statistik/components/statistik-termine/statistik-termine.component";
import { StatistikOverviewComponent } from "./components/statistik/statistik-overview/statistik-overview.component";
import { RechnungsGeneratorComponent } from "./components/tools/rechnungs-generator/rechnungs-generator.component";
import { MkjTemplateDirective } from "./directives/mkj-template.directive";
import { VisibleForPermissionDirective } from "./directives/visible-for-permission.directive";
import { AuthInterceptor } from "./guards/auth-interceptor";
import { GlobalRouteGuard } from "./guards/global-route.guard";
import { MkjChangeLogsComponent } from "./pages/change-logs/change-logs.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { FullNamePipe } from "./pipes/full-name.pipe";
import { MkjDatePipe } from "./pipes/mkj-date.pipe";
import { MkjTextTransformPipe } from "./pipes/mkj-text-transform.pipe";
import { mkjAppInitializer } from "./providers/mkj-app-initializer";
import { MenuService } from "./services/menu.service";
import { AusrueckungFormComponent } from "./utilities/form-components/ausrueckung-form/ausrueckung-form.component";
import { InstrumentFormComponent } from "./utilities/form-components/instrument-form/instrument-form.component";
import { MitgliedFormComponent } from "./utilities/form-components/mitglied-form/mitglied-form.component";
import { MkjGruppeFormComponent } from "./utilities/form-components/mkj-gruppe-form/mkj-gruppe-form.component";
import { MkjNotenFormComponent } from "./utilities/form-components/mkj-noten-form/mkj-noten-form.component";
import { MkjNotenmappeFormComponent } from "./utilities/form-components/mkj-notenmappe-form/mkj-notenmappe-form.component";
import { MkjBooleanInputComponent } from "./utilities/form-input-components/mkj-boolean-input/mkj-boolean-input.component";
import { MkjColorPickerComponent } from "./utilities/form-input-components/mkj-color-picker/mkj-color-picker.component";
import { MkjDateInputComponent } from "./utilities/form-input-components/mkj-date-input/mkj-date-input.component";
import { MkjLinkInputComponent } from "./utilities/form-input-components/mkj-link-input/mkj-link-input.component";
import { MkjContentLoaderComponent } from "./utilities/mkj-content-loader/mkj-content-loader.component";
import { MkjDisplayFieldComponent } from "./utilities/mkj-display-field/mkj-display-field.component";
import { MkjMitgliedAutocompleteComponent } from "./utilities/mkj-mitglied-autocomplete/mkj-mitglied-autocomplete.component";
import { MkjNotensucheComponent } from "./utilities/mkj-notensuche/mkj-notensuche.component";
import { MkjRechnungComponent } from "./utilities/mkj-rechnung/mkj-rechnung.component";
import { TerminTeilnahmeSelectorComponent } from "./utilities/mkj-termin-teilnahme-selector/termin-teilnahme-selector.component";
import { MkjTileComponent } from "./utilities/mkj-tile/mkj-tile.component";
import { MkjToolbarComponent } from "./utilities/mkj-toolbar/mkj-toolbar.component";
import { GlobaleEinstellungenComponent } from './components/einstellungen/globale-einstellungen/globale-einstellungen.component';
import { MkjTextInputComponent } from './utilities/form-input-components/mkj-text-input/mkj-text-input.component';
import { UiNamingConfigComponent } from './components/einstellungen/globale-einstellungen/ui-naming-config/ui-naming-config.component';

// FullCalendarModule.registerPlugins([
//     dayGridPlugin,
//     timeGridPlugin,
//     interactionPlugin,
// ]);

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
        // FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        TriStateCheckboxModule,
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
        AusrueckungenWrapperComponent,
        ArchivWrapperComponent,
        MitgliederWrapperComponent,
        StatistikMitgliederComponent,
        TestApiComponent,
        MkjDateInputComponent,
        AppTimelineDemoComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AusrueckungSingleComponent,
        EinstellungenWrapperComponent,
        MkjDatePipe,
        MkjDashboardComponent,
        SignupComponent,
        LoginComponent,
        MitgliederListComponent,
        MitgliederDetailsComponent,
        NotenarchivComponent,
        VisibleForPermissionDirective,
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
        MkjContentLoaderComponent,
        MkjTemplateDirective,
        AusrueckungFormComponent,
        MkjBooleanInputComponent,
        GruppenOverviewComponent,
        MitgliedFormComponent,
        MkjNotenFormComponent,
        MkjTileComponent,
        GruppeDetailsComponent,
        MkjGruppeFormComponent,
        FullNamePipe,
        BugReportComponent,
        MkjColorPickerComponent,
        NotenmappeDetailsComponent,
        MkjNotenmappeFormComponent,
        NextTerminComponent,
        TerminCardComponent,
        StatistikTermineComponent,
        StatistikNotenComponent,
        NotenCardComponent,
        StatistikOverviewComponent,
        MitgliedRolesPickerComponent,
        InstrumenteOverviewComponent,
        InstrumenteEditorComponent,
        InstrumentFormComponent,
        AnwesenheitsListeComponent,
        StatistikMitgliederGeschlechtComponent,
        StatistikGruppenTermineComponent,
        NextGeburtstagComponent,
        TerminTeilnahmeSelectorComponent,
        TeilnahmenOverviewComponent,
        MkjMitgliedAutocompleteComponent,
        MkjLinkInputComponent,
        MkjChangeLogsComponent,
        GlobaleEinstellungenComponent,
        MkjTextInputComponent,
        UiNamingConfigComponent,
    ],
    providers: [
        mkjAppInitializer(),
        MenuService,
        ConfirmationService,
        DatePipe,
        RouteGuard,
        GlobalRouteGuard,
        MessageService,
        MkjDatePipe,
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

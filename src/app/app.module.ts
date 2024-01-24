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

// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// MKJ
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { environment } from "src/environments/environment";
import { AatestComponent } from "./components/aatest/aatest.component";
import { TestApiComponent } from "./components/aatest/test-api/test-api.component";
import { InstrumenteEditorComponent } from "./components/archiv/instrumente/instrumente-editor/instrumente-editor.component";
import { InstrumenteOverviewComponent } from "./components/archiv/instrumente/instrumente-overview/instrumente-overview.component";
import { NotenEditorComponent } from "./components/archiv/noten/noten-editor/noten-editor.component";
import { NotenOverviewComponent } from "./components/archiv/noten/noten-overview/noten-overview.component";
import { NotenmappeEditComponent } from "./components/archiv/notenmappen/notenmappe-edit/notenmappe-edit.component";
import { NotenmappenOverviewComponent } from "./components/archiv/notenmappen/notenmappen-overview/notenmappen-overview.component";
import { TerminEditComponent } from "./components/termine/termin-edit/termin-edit.component";
import { AnwesenheitsListeComponent } from "./components/termine/anwesenheits-liste/anwesenheits-liste.component";
import { TerminDetailsComponent } from "./components/termine/termin-details/termin-details.component";
import { TeilnahmenOverviewComponent } from "./components/termine/teilnahmen-overview/teilnahmen-overview.component";
import { TermineOverviewComponent } from "./components/termine/termine-overview/termine-overview.component";
import { KalenderaboComponent } from "./components/termine/kalenderabo/kalenderabo.component";
import { LokaleEinstellungenComponent } from "./components/einstellungen/lokale-einstellungen/lokale-einstellungen.component";
import { MitgliedPersonalEditComponent } from "./components/einstellungen/mitglied-personal-edit/mitglied-personal-edit.component";
import { RollenEditComponent } from "./components/einstellungen/rollen-edit/rollen-edit.component";
import { GruppeEditComponent } from "./components/gruppen/gruppe-edit/gruppe-edit.component";
import { GruppenOverviewComponent } from "./components/gruppen/gruppen-overview/gruppen-overview.component";
import { MitgliederOverviewComponent } from "./components/mitglieder/mitglied-overview/mitglieder-overview.component";
import { MitgliedRolesPickerComponent } from "./components/mitglieder/mitglied-roles-picker/mitglied-roles-picker.component";
import { MitgliederEditComponent } from "./components/mitglieder/mitglieder-edit/mitglieder-edit.component";
import { MkjDashboardComponent } from "./components/mkj-dashboard/mkj-dashboard.component";
import { NextGeburtstagComponent } from "./components/mkj-dashboard/next-geburtstag/next-geburtstag.component";
import { NextTerminComponent } from "./components/mkj-dashboard/next-termin/next-termin.component";
import { StatistikGruppenTermineComponent } from "./components/statistik/components/statistik-gruppen-termine/statistik-gruppen-termine.component";
import { StatistikMitgliederGeschlechtComponent } from "./components/statistik/components/statistik-mitglieder-geschlecht/statistik-mitglieder-geschlecht.component";
import { StatistikMitgliederComponent } from "./components/statistik/components/statistik-mitglieder/statistik-mitglieder.component";
import { StatistikNotenComponent } from "./components/statistik/components/statistik-noten/statistik-noten.component";
import { StatistikTermineComponent } from "./components/statistik/components/statistik-termine/statistik-termine.component";
import { StatistikOverviewComponent } from "./components/statistik/statistik-overview/statistik-overview.component";
import { KassabuecherComponent } from "./components/finanzen/kassabuecher-overview/kassabuecher-overview.component";
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
import { MkjBooleanInputComponent } from "./utilities/form-input-components/mkj-boolean-input/mkj-boolean-input.component";
import { MkjColorPickerComponent } from "./utilities/form-input-components/mkj-color-picker/mkj-color-picker.component";
import { MkjDateInputComponent } from "./utilities/form-input-components/mkj-date-input/mkj-date-input.component";
import { MkjLinkInputComponent } from "./utilities/form-input-components/mkj-link-input/mkj-link-input.component";
import { MkjContentLoaderComponent } from "./utilities/mkj-content-loader/mkj-content-loader.component";
import { MkjDisplayFieldComponent } from "./utilities/mkj-display-model/mkj-display-field/mkj-display-field.component";
import { MkjRechnungComponent } from "./utilities/mkj-rechnung/mkj-rechnung.component";
import { TerminTeilnahmeSelectorComponent } from "./utilities/mkj-termin-teilnahme-selector/termin-teilnahme-selector.component";
import { MkjTileComponent } from "./utilities/mkj-tile-view/mkj-tile/mkj-tile.component";
import { MkjToolbarComponent } from "./utilities/mkj-toolbar/mkj-toolbar.component";
import { GlobaleEinstellungenComponent } from "./components/einstellungen/globale-einstellungen/globale-einstellungen.component";
import { MkjTextInputComponent } from "./utilities/form-input-components/mkj-text-input/mkj-text-input.component";
import { UiNamingConfigComponent } from "./components/einstellungen/globale-einstellungen/ui-naming-config/ui-naming-config.component";
import { MkjListComponent } from "./utilities/mkj-list/mkj-list.component";
import { MkjTileViewComponent } from "./utilities/mkj-tile-view/mkj-tile-view.component";
import { KassabuchDetailsComponent } from "./components/finanzen/kassabuch-details/kassabuch-details.component";
import { KassabuchEditComponent } from "./components/finanzen/kassabuch-edit/kassabuch-edit.component";
import { MkjFormWrapperComponent } from "./utilities/form-components/mkj-form-wrapper/mkj-form-wrapper.component";
import { KassabuchungEditComponent } from "./components/finanzen/kassabuchung-edit/kassabuchung-edit.component";
import { AnschriftFormComponent } from "./utilities/form-input-components/anschrift-form/anschrift-form.component";
import { MkjFormErrorPipe } from "./pipes/mkj-form-error.pipe";
import { MkjNumberInputComponent } from "./utilities/form-input-components/mkj-number-input/mkj-number-input.component";
import { MkjDropdownComponent } from "./utilities/form-input-components/mkj-dropdown/mkj-dropdown.component";
import { MkjTextAreaInputComponent } from "./utilities/form-input-components/mkj-text-area-input/mkj-text-area-input.component";
import { MkjTagComponent } from "./utilities/mkj-tag/mkj-tag.component";
import { PermissionSelectedPipe } from "./components/einstellungen/rollen-edit/permission-included.pipe";
import { AnschriftenOverviewComponent as AnschriftOverviewComponent } from "./components/anschriften/anschriften-overview/anschriften-overview.component";
import { AnschriftEditComponent } from "./components/anschriften/anschriften-edit/anschriften-edit.component";
import { MkjListCellComponent } from "./utilities/mkj-list/mkj-list-cell/mkj-list-cell.component";
import { ListCellValuePipe } from "./utilities/mkj-list/mkj-list-cell/list-cell-value.pipe";
import { GruppeMitgliederListComponent } from "./components/gruppen/gruppe-mitglieder-list/gruppe-mitglieder-list.component";
import { NotenmappeNotenListComponent } from "./components/archiv/notenmappen/notenmappe-noten-list/notenmappe-noten-list.component";
import { KassabuchungenListComponent } from "./components/finanzen/kassabuchungen-list/kassabuchungen-list.component";
import { RouterOutletWrapperComponent } from "./components/router-outlet-wrapper.component";
import { TerminStatusSeverityPipe } from "./pipes/termin-status-severity.pipe";
import { MkjAutocompleteComponent } from "./utilities/form-input-components/mkj-autocomplete/mkj-autocomplete.component";
import { DropdownOptionsEditComponent } from "./components/einstellungen/globale-einstellungen/dropdown-options-edit/dropdown-options-edit.component";
import { MkjDisplayModelComponent } from "./utilities/mkj-display-model/mkj-display-model.component";

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
        PermissionSelectedPipe,
        AnschriftOverviewComponent,
        RouterOutletWrapperComponent,
        TerminStatusSeverityPipe,
        AnschriftEditComponent,
        AppMainComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppSideBarComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        StatistikMitgliederComponent,
        TestApiComponent,
        MkjDateInputComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        MkjDisplayModelComponent,
        AppAccessdeniedComponent,
        MkjListCellComponent,
        TerminDetailsComponent,
        MkjDatePipe,
        MkjDashboardComponent,
        SignupComponent,
        LoginComponent,
        MitgliederOverviewComponent,
        MitgliederEditComponent,
        NotenOverviewComponent,
        VisibleForPermissionDirective,
        NotenEditorComponent,
        MkjToolbarComponent,
        TerminEditComponent,
        RollenEditComponent,
        ListCellValuePipe,
        MkjTextTransformPipe,
        MkjDisplayFieldComponent,
        AatestComponent,
        MitgliedPersonalEditComponent,
        MkjRechnungComponent,
        NotenmappenOverviewComponent,
        KassabuecherComponent,
        LokaleEinstellungenComponent,
        KalenderaboComponent,
        TermineOverviewComponent,
        MkjContentLoaderComponent,
        MkjTemplateDirective,
        MkjBooleanInputComponent,
        GruppenOverviewComponent,
        MkjTileComponent,
        GruppeEditComponent,
        FullNamePipe,
        MkjColorPickerComponent,
        NotenmappeEditComponent,
        NextTerminComponent,
        StatistikTermineComponent,
        StatistikNotenComponent,
        StatistikOverviewComponent,
        MitgliedRolesPickerComponent,
        InstrumenteOverviewComponent,
        InstrumenteEditorComponent,
        AnwesenheitsListeComponent,
        StatistikMitgliederGeschlechtComponent,
        StatistikGruppenTermineComponent,
        NextGeburtstagComponent,
        TerminTeilnahmeSelectorComponent,
        TeilnahmenOverviewComponent,
        MkjLinkInputComponent,
        MkjChangeLogsComponent,
        GlobaleEinstellungenComponent,
        MkjTextInputComponent,
        UiNamingConfigComponent,
        MkjListComponent,
        MkjTileViewComponent,
        KassabuchDetailsComponent,
        KassabuchEditComponent,
        MkjFormWrapperComponent,
        KassabuchungEditComponent,
        AnschriftFormComponent,
        MkjFormErrorPipe,
        MkjNumberInputComponent,
        MkjDropdownComponent,
        MkjTextAreaInputComponent,
        MkjTagComponent,
        GruppeMitgliederListComponent,
        NotenmappeNotenListComponent,
        KassabuchungenListComponent,
        MkjAutocompleteComponent,
        DropdownOptionsEditComponent,
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
        FullNamePipe,
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

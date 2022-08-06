import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Subject } from "rxjs";
import { AuthStateService } from "./authentication/auth-state.service";

@Injectable()
export class MenuService {
    public readonly MainMenu: MkjMenuItem[] = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            routerLink: "dashboard",
            enumLabel: MenuLabels.DASHBOARD,
            visible: true,
        },
        {
            label: "Ausrückungen",
            icon: "pi pi-fw pi-calendar",
            routerLink: "ausrueckungen",
            enumLabel: MenuLabels.AUSRUECKUNGEN,
            visible: true,
        },
        {
            label: "Mitglieder",
            icon: "pi pi-fw pi-users",
            routerLink: "mitglieder",
            enumLabel: MenuLabels.MITGLIEDER,
            visible: true,
        },
        {
            label: "Noten",
            icon: "mdi mdi-music",
            routerLink: null,
            enumLabel: MenuLabels.NOTEN,
            visible: true,

            children: [
                {
                    label: "Archiv",
                    icon: "mdi mdi-archive-music-outline",
                    routerLink: "noten/archiv",
                    visible: true,
                },
                {
                    label: "Mappen",
                    icon: "mdi mdi-book-music-outline",
                    routerLink: "noten/mappen",
                    visible: true,
                },
            ],
        },
        {
            label: "Tools",
            icon: "mdi mdi-tools",
            routerLink: null,
            enumLabel: MenuLabels.TOOLS,
            visible: true,

            children: [
                {
                    label: "Rechnungs-Generator",
                    icon: "mdi mdi-currency-eur",
                    routerLink: "tools/rechnungsgenerator",
                    visible: true,
                },
            ],
        },
        {
            label: "Einstellungen",
            icon: "pi pi-fw pi-cog",
            routerLink: null,
            enumLabel: MenuLabels.EINSTELLUNGEN,
            visible: true,

            children: [
                {
                    label: "Meine Daten",
                    icon: "pi pi-user",
                    routerLink: "einstellungen/mitgliedsdaten",
                    visible: true,
                },
                {
                    label: "Rollen & Rechte",
                    icon: "mdi mdi-account-lock-open-outline",
                    routerLink: "einstellungen/rollen",
                    visible: true,
                },
                {
                    label: "Lokal",
                    icon: "mdi mdi-cellphone-cog",
                    routerLink: "einstellungen/lokal",
                    visible: true,
                },
                {
                    label: "Reload App",
                    icon: "pi pi-refresh",
                    routerLink: null,
                    visible: true,

                    command: () => {
                        window.location.reload();
                    },
                },
            ],
        },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            routerLink: "login",
            enumLabel: MenuLabels.LOGOUT,
            visible: true,
            command: () => {
                this.authStateService.setAuthState(false);
            },
        },
        {
            label: "Test",
            icon: "pi pi-pencil",
            routerLink: "test",
            enumLabel: MenuLabels.TEST,
            visible: true,
        },
        {
            label: "PrimeMenu",
            icon: "pi pi-list",
            routerLink: null,
            enumLabel: MenuLabels.PRIMEMENU,
            visible: true,
        },
    ];

    private menuSource = new Subject<string>();
    private resetSource = new Subject();

    public menuSource$ = this.menuSource.asObservable();
    public resetSource$ = this.resetSource.asObservable();

    constructor(private authStateService: AuthStateService) {}

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next(null);
    }
}

export interface MkjMenuItem extends MenuItem {
    permission?: string;
    children?: MkjMenuItem[];
    enumLabel?: number;
}

export const MenuLabels = {
    //with sidemenu <= 4
    PRIMEMENU: 0,
    TOOLS: 2,
    NOTEN: 3,
    EINSTELLUNGEN: 4,

    //without sidemenu > 4
    DASHBOARD: 5,
    AUSRUECKUNGEN: 7,
    MITGLIEDER: 8,
    LOGOUT: 9,
    TEST: 20,
};

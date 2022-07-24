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
        },
        {
            label: "Ausrückungen",
            icon: "pi pi-fw pi-calendar",
            routerLink: "ausrueckungen",
        },
        {
            label: "Mitglieder",
            icon: "pi pi-fw pi-users",
            routerLink: "mitglieder",
        },
        {
            label: "Noten",
            icon: "mdi mdi-music",
            routerLink: null,
            children: [
                {
                    label: "Archiv",
                    icon: "mdi mdi-archive-music-outline",
                    routerLink: "noten/archiv",
                },
                {
                    label: "Mappen",
                    icon: "mdi mdi-book-music-outline",
                    routerLink: "noten/mappen",
                },
            ],
        },
        {
            label: "Tools",
            icon: "mdi mdi-tools",
            routerLink: null,
            children: [
                {
                    label: "Rechnungs-Generator",
                    icon: "mdi mdi-currency-eur",
                    routerLink: "tools/rechnungsgenerator",
                },
            ],
        },
        {
            label: "Einstellungen",
            icon: "pi pi-fw pi-cog",
            routerLink: null,
            children: [
                {
                    label: "Meine Daten",
                    icon: "pi pi-user",
                    routerLink: "einstellungen/mitgliedsdaten",
                },
                {
                    label: "Rollen & Rechte",
                    icon: "mdi mdi-account-lock-open-outline",
                    routerLink: "einstellungen/rollen",
                },
                {
                    label: "Lokal",
                    icon: "mdi mdi-cellphone-cog",
                    routerLink: "einstellungen/lokal",
                },
                {
                    label: "Reload App",
                    icon: "pi pi-refresh",
                    routerLink: null,
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
            command: () => {
                this.authStateService.setAuthState(false);
            },
        },
        {
            label: "Test",
            icon: "pi pi-pencil",
            routerLink: "test",
        },
        {
            label: "PrimeMenu",
            icon: "pi pi-list",
            routerLink: null,
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

interface MkjMenuItem extends MenuItem {
    permission?: string;
    children?: MkjMenuItem[];
}

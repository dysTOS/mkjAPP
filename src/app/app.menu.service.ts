import { Injectable, OnDestroy } from "@angular/core";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Subject } from "rxjs";
import { SubSink } from "subsink";
import { AuthStateService } from "./authentication/auth-state.service";
import { UserService } from "./authentication/user.service";
import { Permission } from "./mkjInterfaces/User";

@Injectable()
export class MenuService implements OnDestroy {
    public readonly MainMenu: MkjMenuItem[] = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            routerLink: "dashboard",
            enumLabel: MenuLabels.DASHBOARD,
            visible: false,
            permission: "read ausrueckungen",
        },
        {
            label: "Ausrückungen",
            icon: "pi pi-fw pi-calendar",
            routerLink: "ausrueckungen",
            enumLabel: MenuLabels.AUSRUECKUNGEN,
            visible: false,
            permission: "read ausrueckungen",
        },
        {
            label: "Mitglieder",
            icon: "pi pi-fw pi-users",
            routerLink: "mitglieder",
            enumLabel: MenuLabels.MITGLIEDER,
            visible: false,
            permission: "read mitglieder",
        },
        {
            label: "Noten",
            icon: "mdi mdi-music",
            routerLink: null,
            enumLabel: MenuLabels.NOTEN,
            visible: false,
            permission: "read noten",

            children: [
                {
                    label: "Archiv",
                    icon: "mdi mdi-archive-music-outline",
                    routerLink: "noten/archiv",
                    visible: false,
                    permission: "read noten",
                },
                {
                    label: "Mappen",
                    icon: "mdi mdi-book-music-outline",
                    routerLink: "noten/mappen",
                    visible: false,
                    permission: "read noten",
                },
            ],
        },
        {
            label: "Tools",
            icon: "mdi mdi-tools",
            routerLink: null,
            enumLabel: MenuLabels.TOOLS,
            visible: false,
            permission: "read role",
            children: [
                {
                    label: "Rechnungs-Generator",
                    icon: "mdi mdi-currency-eur",
                    routerLink: "tools/rechnungsgenerator",
                    visible: false,
                    permission: "read role",
                },
            ],
        },
        {
            label: "Einstellungen",
            icon: "pi pi-fw pi-cog",
            routerLink: null,
            enumLabel: MenuLabels.EINSTELLUNGEN,
            visible: false,
            children: [
                {
                    label: "Meine Daten",
                    icon: "pi pi-user",
                    routerLink: "einstellungen/mitgliedsdaten",
                    visible: false,
                },
                {
                    label: "Rollen & Rechte",
                    icon: "mdi mdi-account-lock-open-outline",
                    routerLink: "einstellungen/rollen",
                    visible: false,
                    permission: "read role",
                },
                {
                    label: "Lokal",
                    icon: "mdi mdi-cellphone-cog",
                    routerLink: "einstellungen/lokal",
                    visible: false,
                    permission: "read ausrueckungen",
                },
                {
                    label: "Reload App",
                    icon: "pi pi-refresh",
                    routerLink: null,
                    visible: false,
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
            visible: false,
            command: () => {
                this.confirmationService.confirm({
                    message: "Auf diesem Geräte abmelden?",
                    icon: "pi pi-exclamation-triangle",
                    accept: () => {
                        // this.authStateService.setAuthState(false);
                    },
                });
            },
        },

        {
            label: "Test",
            icon: "pi pi-pencil",
            routerLink: "test",
            enumLabel: MenuLabels.TEST,
            visible: false,
            permission: "read role",
        },
        {
            label: "PrimeMenu",
            icon: "pi pi-list",
            routerLink: null,
            enumLabel: MenuLabels.PRIMEMENU,
            visible: false,
            permission: "read role",
        },
    ];

    private menuSource = new Subject<string>();
    private resetSource = new Subject();

    public menuSource$ = this.menuSource.asObservable();
    public resetSource$ = this.resetSource.asObservable();

    private subSink = new SubSink();

    constructor(
        private authStateService: AuthStateService,
        private confirmationService: ConfirmationService,
        private userService: UserService
    ) {
        this.subSink.add(
            this.userService.getCurrentUserPermissions().subscribe({
                next: (perm) =>
                    this.updateMenuItemsVisibility(perm, this.MainMenu),
            })
        );
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next(null);
    }

    private updateMenuItemsVisibility(
        permissions: Permission[],
        menu: MkjMenuItem[]
    ) {
        menu.forEach((item) => {
            if (
                permissions.find((e) => e.name === item.permission) ||
                !item.permission
            ) {
                item.visible = true;
            } else {
                item.visible = false;
            }

            if (item.children) {
                this.updateMenuItemsVisibility(permissions, item.children);
            }
        });
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

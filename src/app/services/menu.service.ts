import { Injectable, OnDestroy } from "@angular/core";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Subject } from "rxjs";
import { SubSink } from "subsink";
import { Permission, PermissionMap } from "../models/User";
import { AuthStateService } from "./authentication/auth-state.service";
import { UserService } from "./authentication/user.service";

@Injectable()
export class MenuService implements OnDestroy {
    public readonly MainMenu: MkjMenuItem[] = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            routerLink: "dashboard",
            enumLabel: MenuLabels.DASHBOARD,
            visible: false,
        },
        {
            label: "Termine",
            icon: "pi pi-fw pi-calendar",
            enumLabel: MenuLabels.AUSRUECKUNGEN,
            visible: false,
            children: [
                {
                    label: "Terminübersicht",
                    icon: "pi pi-fw pi-calendar",
                    routerLink: "ausrueckungen/aktuell",
                },
                // {
                //     label: "Ausrückungsarchiv",
                //     icon: "pi pi-fw pi-calendar",
                //     routerLink: "ausrueckungen/archiv",
                // },
                {
                    label: "Kalenderabo",
                    icon: "pi pi-fw pi-calendar",
                    routerLink: "ausrueckungen/kalenderabo",
                },
            ],
        },
        {
            label: "Mitglieder",
            icon: "pi pi-fw pi-users",
            enumLabel: MenuLabels.MITGLIEDER,
            permission: PermissionMap.MITGLIEDER_READ,
            children: [
                {
                    label: "Mitglieder",
                    icon: "pi pi-users",
                    routerLink: "mitglieder/liste",
                    permission: PermissionMap.MITGLIEDER_READ,
                },
                {
                    label: "Register & Gruppen",
                    icon: "pi pi-folder-open",
                    routerLink: "mitglieder/gruppen",
                    permission: PermissionMap.GRUPPEN_READ,
                },
            ],
        },
        {
            label: "Archiv",
            icon: "mdi mdi-archive-music-outline",
            enumLabel: MenuLabels.ARCHIV,
            visible: false,
            permission: PermissionMap.NOTEN_READ,
            children: [
                {
                    label: "Noten",
                    icon: "mdi mdi-music",
                    routerLink: "archiv/noten",
                    visible: false,
                    permission: PermissionMap.NOTEN_READ,
                },
                {
                    label: "Notenmappen",
                    icon: "mdi mdi-book-music-outline",
                    routerLink: "archiv/mappen",
                    visible: false,
                    permission: PermissionMap.NOTENMAPPE_READ,
                },
                {
                    label: "Instrumente",
                    icon: "mdi mdi-trumpet",
                    routerLink: "archiv/instrumente",
                    visible: false,
                    permission: PermissionMap.INSTRUMENTE_READ,
                },
            ],
        },
        {
            label: "Statistiken",
            icon: "pi pi-chart-line",
            enumLabel: MenuLabels.STATISTIK,
            visible: false,
            routerLink: "statistik",
        },
        {
            label: "Tools",
            icon: "mdi mdi-tools",
            enumLabel: MenuLabels.TOOLS,
            visible: false,
            permission: PermissionMap.ROLE_ASSIGN,
            children: [
                {
                    label: "Rechnungs-Generator",
                    icon: "mdi mdi-currency-eur",
                    routerLink: "tools/rechnungsgenerator",
                    visible: false,
                },
            ],
        },
        {
            label: "Einstellungen",
            icon: "pi pi-fw pi-cog",
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
                    permission: PermissionMap.ROLE_READ,
                },
                {
                    label: "Lokale Einstellungen",
                    icon: "mdi mdi-cellphone-cog",
                    routerLink: "einstellungen/lokal",
                    visible: false,
                },
                {
                    label: "Bug Report",
                    icon: "mdi mdi-bug-outline",
                    routerLink: "einstellungen/bugreport",
                    permission: PermissionMap.ROLE_ASSIGN,
                    visible: false,
                },
                {
                    label: "Change Log",
                    icon: "mdi mdi-history",
                    routerLink: "einstellungen/changelog",
                },
            ],
        },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            enumLabel: MenuLabels.LOGOUT,
            visible: false,
            command: () => {
                this.confirmationService.confirm({
                    message: "Auf diesem Gerät abmelden?",
                    icon: "pi pi-exclamation-triangle",
                    accept: () => {
                        this.authStateService.setAuthState(false);
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
            permission: PermissionMap.ROLE_ASSIGN,
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
                next: (permissions) =>
                    this.updateMenuItemsVisibility(permissions, this.MainMenu),
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
                !item.permission ||
                permissions.find((e) => e.name === item.permission)
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

    public getMenuItemByRouterLink(
        routerLink: string,
        menuArray: MkjMenuItem[] = this.MainMenu
    ): MkjMenuItem | null {
        let item = null;

        for (let i = 0; i < menuArray.length - 1; i++) {
            if (menuArray[i].routerLink?.includes(routerLink)) {
                item = menuArray[i];
            }
            if (!item && menuArray[i].children) {
                item = this.getMenuItemByRouterLink(
                    routerLink,
                    menuArray[i].children
                );
            }
            if (item) {
                break;
            }
        }

        return item;
    }
}

export interface MkjMenuItem extends MenuItem {
    permission?: string;
    children?: MkjMenuItem[];
    enumLabel?: number;
}

export const MenuLabels = {
    //without sidemenu <= 4
    PRIMEMENU: 0,
    STATISTIK: 1,
    TOOLS: 2,
    NOTEN: 3,
    EINSTELLUNGEN: 4,

    //with sidemenu > 4
    DASHBOARD: 5,
    AUSRUECKUNGEN: 7,
    MITGLIEDER: 8,
    LOGOUT: 9,
    ARCHIV: 10,
    TEST: 20,
};

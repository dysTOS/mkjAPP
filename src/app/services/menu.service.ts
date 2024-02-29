import { Injectable, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SubSink } from 'subsink';
import { Permission, PermissionKey } from '../models/User';
import { AuthStateService } from './authentication/auth-state.service';
import { UserService } from './authentication/user.service';
import { ConfigurationService } from './configuration.service';
import { InfoService } from './info.service';

export interface MkjMenuItem extends MenuItem {
  permission?: PermissionKey;
  children?: MkjMenuItem[];
  enumLabel?: number;
}

export const MenuLabels = {
  //without sidemenu <= 4
  PRIMEMENU: 0,
  STATISTIK: 1,
  FINANZEN: 2,
  EINSTELLUNGEN: 4,

  //with sidemenu > 4
  DASHBOARD: 5,
  TOOLS: 6,
  TERMINE: 7,
  MITGLIEDER: 8,
  LOGOUT: 9,
  ARCHIV: 10,
  TEST: 20,
};

@Injectable()
export class MenuService implements OnDestroy {
  public readonly MainMenu: MkjMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: 'dashboard',
      enumLabel: MenuLabels.DASHBOARD,
    },
    {
      label: this.namingService.uiNaming.Termine,
      icon: 'pi pi-fw pi-calendar',
      enumLabel: MenuLabels.TERMINE,
      permission: PermissionKey.TERMIN_READ,
      children: [
        {
          label: 'Terminübersicht',
          icon: 'pi pi-fw pi-calendar',
          routerLink: 'termine/liste',
        },
        {
          label: 'Kalenderabo',
          icon: 'pi pi-fw pi-calendar',
          routerLink: 'termine/kalenderabo',
        },
      ],
    },
    {
      label: this.namingService.uiNaming.Mitglieder,
      icon: 'pi pi-fw pi-users',
      enumLabel: MenuLabels.MITGLIEDER,
      permission: PermissionKey.MITGLIEDER_READ,
      children: [
        {
          label: this.namingService.uiNaming.Mitglieder,
          icon: 'pi pi-users',
          routerLink: 'mitglieder/liste',
          permission: PermissionKey.MITGLIEDER_READ,
        },
        {
          label: this.namingService.uiNaming.Gruppen,
          icon: 'pi pi-folder-open',
          routerLink: 'mitglieder/gruppen',
          permission: PermissionKey.GRUPPEN_READ,
        },
      ],
    },
    {
      label: this.namingService.uiNaming.Archiv,
      icon: 'mdi mdi-archive-music-outline',
      enumLabel: MenuLabels.ARCHIV,
      permission: PermissionKey.NOTEN_READ,
      children: [
        {
          label: this.namingService.uiNaming.Noten,
          icon: 'mdi mdi-music',
          routerLink: 'archiv/noten',
          permission: PermissionKey.NOTEN_READ,
        },
        {
          label: this.namingService.uiNaming.Notenmappen,
          icon: 'mdi mdi-book-music-outline',
          routerLink: 'archiv/mappen',
          permission: PermissionKey.NOTENMAPPE_READ,
        },
        {
          label: this.namingService.uiNaming.Instrumente,
          icon: 'mdi mdi-trumpet',
          routerLink: 'archiv/instrumente',
          permission: PermissionKey.INSTRUMENTE_READ,
        },
      ],
    },
    {
      label: this.namingService.uiNaming.Statistiken,
      icon: 'pi pi-chart-line',
      enumLabel: MenuLabels.STATISTIK,
      routerLink: 'statistik',
    },
    {
      label: this.namingService.uiNaming.Finanzen,
      icon: 'mdi mdi-currency-eur',
      enumLabel: MenuLabels.FINANZEN,
      permission: PermissionKey.KASSABUCH_READ,
      children: [
        {
          label: 'Kassabücher',
          icon: 'mdi mdi-currency-eur',
          routerLink: 'finanzen/list',
          permission: PermissionKey.KASSABUCH_READ,
        },
        {
          label: this.namingService.uiNaming.Anschriften,
          icon: 'pi pi-fw pi-users',
          routerLink: 'finanzen/adressen',
          permission: PermissionKey.ANSCHRIFTEN_READ,
        },
      ],
    },
    {
      label: 'Tools',
      icon: 'mdi mdi-timer-music-outline',
      enumLabel: MenuLabels.TOOLS,
      permission: PermissionKey.USER_DELETE,
      children: [
        {
          label: 'Stimmgerät',
          icon: 'mdi mdi-speedometer',
          routerLink: 'tools/tuner',
        },
        {
          label: 'Metronom',
          icon: 'mdi mdi-metronome',
          routerLink: 'tools/metronom',
        },
        // {
        //   label: 'Transponierer',
        //   icon: 'mdi mdi-playlist-music',
        //   routerLink: 'tools/transposer',
        // },
        {
          label: 'Quintenzirkel',
          icon: 'mdi mdi-music-circle-outline',
          routerLink: 'tools/circle-of-fifths',
        },
        {
          label: 'Synthesizer',
          icon: 'mdi mdi-piano',
          routerLink: 'tools/synth',
        },
      ],
    },
    {
      label: 'Einstellungen',
      icon: 'pi pi-fw pi-cog',
      enumLabel: MenuLabels.EINSTELLUNGEN,
      children: [
        {
          label: 'Meine Daten',
          icon: 'pi pi-user',
          routerLink: 'einstellungen/mitgliedsdaten/' + this.userService.currentMitglied.value?.id,
        },
        {
          label: 'Rollen & Rechte',
          icon: 'mdi mdi-account-lock-open-outline',
          routerLink: 'einstellungen/rollen',

          permission: PermissionKey.ROLE_READ,
        },
        {
          label: 'Lokale Einstellungen',
          icon: 'mdi mdi-cellphone-cog',
          routerLink: 'einstellungen/lokal',
        },
        {
          label: 'Globale Einstellungen',
          icon: 'mdi mdi-cog',
          routerLink: 'einstellungen/global',
          permission: PermissionKey.USER_DELETE,
        },
        {
          label: 'Change Log',
          icon: 'mdi mdi-history',
          routerLink: 'einstellungen/changelog',
        },
      ],
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      enumLabel: MenuLabels.LOGOUT,
      command: (_) => {
        this.infoService
          .confirm('Auf diesem Gerät abmelden?', {
            header: 'Abmelden?',
            icon: 'pi pi-exclamation-triangle',
          })
          .subscribe({
            next: (accepted) => {
              if (accepted) {
                this.authStateService.setAuthState(false);
              }
            },
          });
      },
    },

    {
      label: 'Test',
      icon: 'pi pi-pencil',
      routerLink: 'test',
      enumLabel: MenuLabels.TEST,
      permission: PermissionKey.USER_DELETE,
    },
  ];

  private subSink = new SubSink();

  constructor(
    private authStateService: AuthStateService,
    private infoService: InfoService,
    private userService: UserService,
    private namingService: ConfigurationService
  ) {
    this.subSink.add(
      this.userService.getCurrentUserPermissions().subscribe({
        next: (permissions) => this.updateMenuItemsVisibility(permissions, this.MainMenu),
      })
    );
  }

  public ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  private updateMenuItemsVisibility(permissions: Permission[], menu: MkjMenuItem[]) {
    menu.forEach((item) => {
      if (!item.permission || permissions?.find((e) => e.name === item.permission)) {
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

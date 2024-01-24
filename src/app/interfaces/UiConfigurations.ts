export interface UiConfigurations {
    uiNaming: UiNamingConfig;
    terminConfig: UiTerminConfig;
    notenConfig: UiNotenConfig;
}

export interface UiNamingConfig {
    Archiv: string;
    Anschrift: string;
    Anschriften: string;
    Finanzen: string;
    Gruppen: string;
    Instrumente: string;
    Mitglieder: string;
    Noten: string;
    Notengattung: string;
    Notenmappen: string;
    Statistiken: string;
    Termine: string;
}

export interface UiTerminConfig {
    terminKategorien: UiDropdownOption[];
}

export interface UiNotenConfig {
    notenGattungen: UiDropdownOption[];
}

export interface UiDropdownOption<T = any> {
    label: string;
    value: T;
}

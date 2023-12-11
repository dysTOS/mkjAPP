export interface UiConfigurations {
    uiNaming: UiNamingConfig;
    terminConfig: UiTerminConfig;
}

export interface UiNamingConfig {
    Archiv: string;
    Finanzen: string;
    Instrumente: string;
    Statistiken: string;
    Notenmappen: string;
    Mitglieder: string;
    Termine: string;
    Noten: string;
    Gruppen: string;
}

export interface UiTerminConfig {
    terminKategorien: UiDropdownOption[];
}

export interface UiDropdownOption<T = any> {
    label: string;
    value: T;
}

export interface UiConfigurations {
    uiNaming: UiNamingConfig;
    terminConfig: UiTerminConfig;
}

export interface UiNamingConfig {
    Termine: string;
    Noten: string;
}

export interface UiTerminConfig {
    terminKategorien: UiDropdownOption[];
}

export interface UiDropdownOption {
    label: string;
    value: string;
}

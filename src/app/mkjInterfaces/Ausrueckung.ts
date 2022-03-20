export interface Ausrueckung {
    id?: number;
    name?: string;
    beschreibung?: string;
    infoMusiker?: string;
    oeffentlich?: boolean;
    kategorie?: string;
    status?: string;
    ort?: string;
    treffzeit?: string;
    von?: string;
    bis?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AusrueckungFilterInput {
    vonFilter?: string;
    bisFilter?: string;
    alle?: boolean;
}

export enum ZeitraumOptions {
    ActualYear = 0,
    SpecificRange = 1,
    All = 2
}

export const KategorienOptions = [
    { label: 'Kurkonzert', value: 'Kurkonzert' },
    { label: 'Weckruf', value: 'Weckruf' },
    { label: 'Ständchen', value: 'Ständchen' },
    { label: 'Kirchlich', value: 'kirchlich' },
    { label: 'Sonstige', value: 'sonstige' },
];

export const StatusOptions = [
    { label: 'Fixiert', value: 'fixiert' },
    { label: 'Geplant', value: 'geplant' },
    { label: 'Ersatztermin', value: 'ersatztermin' },
    { label: 'Abgesagt', value: 'abgesagt' },
];

export const ColumnOptions = [
    { field: 'name', header: 'Name' },
    { field: 'von', header: 'Datum' },
    { field: 'kategorie', header: 'Kategorie' },
    { field: 'status', header: 'Status' },
    { field: 'beschreibung', header: 'Beschreibung' },
    { field: 'infoMusiker', header: 'Infos für die Musiker' }
];

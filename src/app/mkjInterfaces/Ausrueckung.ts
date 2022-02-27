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

export const kategorienOptions = [
    { label: 'Kurkonzert', value: 'Kurkonzert' },
    { label: 'Weckruf', value: 'Weckruf' },
    { label: 'Ständchen', value: 'Ständchen' },
];

export const statusOptions = [
    { label: 'Fixiert', value: 'fixiert' },
    { label: 'Geplant', value: 'geplant' },
    { label: 'Abgesagt', value: 'abgesagt' },
    { label: 'Ersatztermin', value: 'ersatztermin' }
];

export const columnOptions = [
    { field: 'name', header: 'Name' },
    { field: 'von', header: 'Datum' },
    { field: 'kategorie', header: 'Kategorie' },
    { field: 'status', header: 'Status' },
    { field: 'beschreibung', header: 'Beschreibung' },
    { field: 'infoMusiker', header: 'Infos für die Musiker' }
];

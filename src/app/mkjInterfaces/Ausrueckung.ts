export interface Ausrueckung {
    id?: string;
    name?: string;
    beschreibung?: string;
    infoMusiker?: string;
    oeffentlich?: boolean;
    kategorie?: string;
    status?: string;
    ort?: string;
    treffzeit?: string;
    vonDatum?: string;
    bisDatum?: string;
    vonZeit?: string;
    bisZeit?: string;
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
    { label: 'Kurkonzert', value: 'kurkonzert' },
    { label: 'Weckruf', value: 'weckruf' },
    { label: 'Kirchlich', value: 'kirchlich' },
    { label: 'Sonstige', value: 'sonstige' },
];

export const StatusOptions = [
    { label: 'Fixiert', value: 'fixiert' },
    { label: 'Geplant', value: 'geplant' },
    { label: 'Ersatztermin', value: 'ersatztermin' },
    { label: 'Abgesagt', value: 'abgesagt' },
];

export const CsvColumns = [
    { field: 'id', header: 'id' },
    { field: 'oeffentlich', header: 'oeffentlich' },
    { field: 'name', header: 'name' },
    { field: 'vonDatum', header: 'vonDatum' },
    { field: 'bisDatum', header: 'bisDatum' },
    { field: 'vonZeit', header: 'vonZeit' },
    { field: 'bisZeit', header: 'bisZeit' },
    { field: 'treffzeit', header: 'treffzeit' },
    { field: 'ort', header: 'ort' },
    { field: 'kategorie', header: 'kategorie' },
    { field: 'status', header: 'status' },
    { field: 'beschreibung', header: 'beschreibung' },
    { field: 'infoMusiker', header: 'infoMusiker' },
    { field: 'created_at', header: 'created_at' },
    { field: 'updated_at', header: 'updated_at' }
];

import { Gruppe } from "./Gruppe";

export interface Termin {
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
    gruppe_id?: string;
    gruppe?: Gruppe;
    created_at?: string;
    updated_at?: string;
}

export const TerminTeilnahmeMap = [
    { label: "Bin da", value: "anwesend", icon: "pi pi-check" },
    { label: "Nicht da", value: "abwesend", icon: "pi pi-times" },
];

export const TerminStatusMap = [
    { label: "Fixiert", value: "fixiert", severity: "success" },
    { label: "Geplant", value: "geplant", severity: "warning" },
    { label: "Ersatztermin", value: "ersatztermin", severity: "info" },
    { label: "Abgesagt", value: "abgesagt", severity: "danger" },
];

export const TerminCsvColumnMap = [
    { field: "id", header: "id" },
    { field: "oeffentlich", header: "oeffentlich" },
    { field: "name", header: "name" },
    { field: "vonDatum", header: "vonDatum" },
    { field: "bisDatum", header: "bisDatum" },
    { field: "vonZeit", header: "vonZeit" },
    { field: "bisZeit", header: "bisZeit" },
    { field: "treffzeit", header: "treffzeit" },
    { field: "ort", header: "ort" },
    { field: "kategorie", header: "kategorie" },
    { field: "status", header: "status" },
    { field: "beschreibung", header: "beschreibung" },
    { field: "infoMusiker", header: "infoMusiker" },
    { field: "created_at", header: "created_at" },
    { field: "updated_at", header: "updated_at" },
];

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

export const TerminKategorieMap = [
    { label: "Kurkonzert", value: "kurkonzert" },
    { label: "Weckruf", value: "weckruf" },
    { label: "Kirchlich", value: "kirchlich" },
    { label: "Probe", value: "probe" },
    { label: "Sonstige", value: "sonstige" },
];

export const TerminStatusMap = [
    { label: "Fixiert", value: "fixiert" },
    { label: "Geplant", value: "geplant" },
    { label: "Ersatztermin", value: "ersatztermin" },
    { label: "Abgesagt", value: "abgesagt" },
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

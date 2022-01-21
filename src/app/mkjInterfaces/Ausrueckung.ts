export interface Ausrueckung {
    id?: string;
    name?: string;
    beschreibung?: string;
    infoMusiker?: string;
    oeffentlich?: boolean;
    kategorie?: string;
    status?: string;
    von?: string;
    bis?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AusrueckungFilterInput {
    vonFilter?: string;
    bisFilter?: string;
}

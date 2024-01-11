export interface Mitglied {
    id?: string;
    user_id?: string;
    vorname?: string;
    zuname?: string;
    email?: string;
    titelVor?: string;
    titelNach?: string;
    geburtsdatum?: string;
    geschlecht?: string;
    strasse?: string;
    hausnummer?: string;
    ort?: string;
    plz?: string;
    telefonHaupt?: string;
    telefonMobil?: string;
    beruf?: string;
    aktiv?: boolean;
    eintrittDatum?: string;
    austrittDatum?: string;
    teilnahmen?: { status?: string }[];
    created_at?: string;
    updated_at?: string;
}

export const MitgliedGeschlechtMap = [
    { label: "Männlich", value: "M" },
    { label: "Weiblich", value: "W" },
    { label: "Divers", value: "D" },
];

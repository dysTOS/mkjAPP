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
    created_at?: string;
    updated_at?: string;
}

export const Mitglied_Geschlecht = [
    { name: 'Männlich', value: 'M' },
    { name: 'Weiblich', value: 'W' },
    { name: 'Divers', value: 'D' },
]

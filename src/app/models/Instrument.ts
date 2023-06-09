import { Gruppe } from "./Gruppe";
import { Mitglied } from "./Mitglied";

export interface Instrument {
    id?: string;
    bezeichnung?: string;
    marke?: string;
    anschaffungsdatum?: string;
    verkaeufer?: string;
    anmerkungen?: string;
    schaeden?: string;
    aufbewahrungsort?: string;
    mitglied_id?: string;
    mitglied?: Mitglied;
    gruppe_id?: string;
    gruppe?: Gruppe;
    created_at?: string;
    updated_at?: string;
}

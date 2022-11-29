import { Mitglied } from "./Mitglied";

export interface Gruppe {
    id?: string;
    name?: string;
    gruppenleiter_mitglied_id?: string;
    color?: string;
    created_at?: string;
    updated_at?: string;
    pivot?: {
        mitglied_id?: string;
        gruppen_id?: string;
        created_at?: string;
        updated_at?: string;
    };
    mitglieder?: Mitglied[];
    gruppenleiter?: Mitglied;
}

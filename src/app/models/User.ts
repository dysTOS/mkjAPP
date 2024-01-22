export interface User {
    id?: string;
    name?: string;
    email?: string;
    mitglied_id?: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Role {
    id?: string;
    name?: string;
    guard_name?: string;
    created_at?: string;
    updated_at?: string;
    pivot?: {
        model_id?: number;
        model_type?: string;
        role_id?: number;
    };
}

export interface Permission {
    id?: string;
    name?: string;
    permission_id?: string;
    role_id?: string;
    guard_name?: string;
    created_at?: string;
    updated_at?: string;
}

export enum PermissionKey {
    ANSCHRIFTEN_READ = "anschriften_read",
    ANSCHRIFTEN_SAVE = "anschriften_save",
    ANSCHRIFTEN_DELETE = "anschriften_delete",

    TERMIN_READ = "ausrueckungen_read",
    TERMIN_SAVE = "ausrueckungen_save",
    TERMIN_DELETE = "ausrueckungen_delete",
    TERMIN_GRUPPENLEITER_SAVE = "termin_gruppenleiter_save",

    MITGLIEDER_READ = "mitglieder_read",
    MITGLIEDER_SAVE = "mitglieder_save",
    MITGLIEDER_DELETE = "mitglieder_delete",
    MITGLIEDER_ASSIGN = "mitglieder_assign",

    GRUPPEN_READ = "gruppen_read",
    GRUPPEN_SAVE = "gruppen_save",
    GRUPPEN_DELETE = "gruppen_delete",
    GRUPPEN_ASSIGN = "gruppen_assign",

    NOTENMAPPE_READ = "notenmappe_read",
    NOTENMAPPE_SAVE = "notenmappe_save",
    NOTENMAPPE_ASSIGN = "notenmappe_assign",
    NOTENMAPPE_DELETE = "notenmappe_delete",

    INSTRUMENTE_READ = "instrumente_read",
    INSTRUMENTE_SAVE = "instrumente_save",
    INSTRUMENTE_DELETE = "instrumente_delete",

    KASSABUCH_READ = "kassabuch_read",
    KASSABUCH_SAVE = "kassabuch_save",
    KASSABUCH_DELETE = "kassabuch_delete",

    KASSABUCHUNG_READ = "kassabuchung_read",
    KASSABUCHUNG_SAVE = "kassabuchung_save",
    KASSABUCHUNG_DELETE = "kassabuchung_delete",

    NOTEN_READ = "noten_read",
    NOTEN_SAVE = "noten_save",
    NOTEN_DELETE = "noten_delete",
    NOTEN_ASSIGN = "noten_assign",

    ROLE_READ = "role_read",
    ROLE_SAVE = "role_save",
    ROLE_DELETE = "role_delete",
    ROLE_ASSIGN = "role_assign",

    USER_DELETE = "user_delete",
}

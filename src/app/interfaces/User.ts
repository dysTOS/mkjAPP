import { Mitglied } from "src/app/interfaces/Mitglied";

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

export interface RegistrationCredentials {
    vorname?: string;
    zuname?: string;
    email?: string;
    passwort?: string;
}

export interface LoginCredentials {
    email?: string;
    passwort?: string;
}

export interface LoginResponse {
    token?: string;
    user?: User;
    roles?: Array<Role>;
    permissions?: Array<Permission>;
    mitglied?: Mitglied;
}

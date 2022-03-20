import { Mitglied } from "src/app/mkjInterfaces/Mitglied";

export interface User {
    id?: number;
    name?: string;
    email?: string;
    mitglied_id?: number;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Role {
    id?: number;
    role?: string;
    name?: string;
    created_at?: string;
    updated_at?: string;
    pivot?: {
        mitglied_id?: number;
        role_id?: number;
    };
}

export enum RoleType {
    MITGLIED = 'mitglied',
    ADMIN = 'admin',
    AUSSCHUSS = 'ausschuss',
    FESTAUSSCHUSS = 'festausschuss'
}

export class RegistrationCredentials {
    vorname?: string;
    zuname?: string;
    email?: string;
    passwort?: string;
}

export class LoginCredentials {
    email?: string;
    passwort?: string;
}

export class LoginResponse {
    token?: string;
    user?: User;
    roles?: Array<Role>;
    mitglied?: Mitglied;
}

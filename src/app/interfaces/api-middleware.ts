import { Permission, Role, User } from "../models/User";
import { Mitglied } from "../models/Mitglied";
import { Gruppe } from "../models/Gruppe";

export interface GetCollectionApiCallInput {
    skip?: number;
    take?: number;
    sort?: {
        sortField?: string;
        sortOrder?: 1 | -1;
    };
    filter?: Array<{
        filterField?: string;
        value?: string;
        operator?: "=" | "like" | ">" | "<";
    }>;
}

export interface GetCollectionApiCallOutput<T> {
    totalCount?: number;
    values?: Array<T>;
}

export interface StandardAllocationInput {
    subjectId?: string;
    collectionId?: string;
}

export interface StandardMessageOutput {
    success?: boolean;
    message?: string;
}

export interface UserRegistrationInput {
    vorname?: string;
    zuname?: string;
    email?: string;
    passwort?: string;
}

export interface UserLoginInput {
    email?: string;
    passwort?: string;
}

export interface UserLoginOutput {
    token?: string;
    user?: User;
    roles?: Array<Role>;
    permissions?: Array<Permission>;
    mitglied?: Mitglied;
    gruppen?: Array<Gruppe>;
}

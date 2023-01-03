import { Permission, Role, User } from "../models/User";
import { Mitglied } from "../models/Mitglied";
import { Gruppe } from "../models/Gruppe";
import { HttpHeaders } from "@angular/common/http";

export interface GetCollectionApiCallInput {
    skip?: number;
    take?: number;
    sort?: {
        sortField?: string;
        sortOrder?: 1 | -1;
    };
    filterAnd?: Array<{
        filterField?: string;
        value?: any;
        operator?: "=" | "like" | ">" | "<" | ">=" | "<=";
    }>;
    filterOr?: Array<{
        filterField?: string;
        value?: any;
        operator?: "=" | "like" | ">" | "<" | ">=" | "<=";
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

export const StandardHttpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

import { Permission, Role, User } from "../models/User";
import { Mitglied } from "../models/Mitglied";
import { Gruppe } from "../models/Gruppe";
import { HttpHeaders } from "@angular/common/http";

export interface GetListInput<T = any> {
    skip?: number;
    take?: number;
    sort?: {
        field: keyof T;
        order?: "asc" | "desc";
    };
    globalFilter?: {
        fields: Array<keyof T>;
        value: string;
    };
    filterAnd?: MkjListInputFilter<T>[];
    filterOr?: MkjListInputFilter<T>[];
}

export interface MkjListInputFilter<T> {
    field: keyof T;
    value: any;
    operator?: "=" | "LIKE" | ">" | "<" | ">=" | "<=";
}

export interface GetListOutput<T> {
    totalCount: number;
    values: Array<T>;
}

export interface AllocationInput {
    subjectId?: string;
    collectionId?: string;
}

export interface MessageOutput {
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

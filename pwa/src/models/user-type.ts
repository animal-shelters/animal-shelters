import Roles from "./role-type";

export default interface User {
    id: number;
    roles: Roles;
}

export interface FullUser {
    id: number;
    email: string;
    roles: Roles;
    name?: string;
    surname?: string;
}

export interface UserDto {
    "@id": string;
    email: string;
    roles: Roles;
    name?: string;
    surname?: string;
}

export function mapUser(user: UserDto): FullUser {
    return {
        id: parseInt(user["@id"].replace(/^\D+/g, '')),
        email: user.email,
        roles: user.roles,
        name: user.name,
        surname: user.surname
    }
}

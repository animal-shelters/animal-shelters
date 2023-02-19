export default interface Roles {
    roles: Array<Role>
}

export enum Role {
    user = 'ROLE_USER',
    admin = 'ROLE_ADMIN'
}
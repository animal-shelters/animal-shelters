import Animal, { AnimalDto } from "./animal.dto";
import User, { FullUser, UserDto } from "./user-type";

export default interface Adoption {
    adoptionId: string;
    userId: number;
    animalId: number;
    date: string;
    user: FullUser;
    animal: Animal;
}

export interface AdoptionDto {
    "@id": string;
    date: string;
    user: UserDto;
    animal: AnimalDto;
}

export interface AdoptionPostDto {
    adoption?: string;
    user: string;
    animal: string;
    date: string;
}

export function mapAdoptionToDto(data: AdoptionPostDto): AdoptionPostDto {
    return {
        adoption: data.adoption ? `/adoptions/${data.adoption}` : undefined,
        user: `/users/${data.user}`,
        animal: `/animals/${data.animal}`,
        date: data.date,
    };
}

export function mapAdoption(data: AdoptionDto): Adoption {
    return {
        adoptionId: data["@id"].replace("/adoptions/", ""),
        userId: parseInt(data.user["@id"].replace(/^\D+/g, '')),
        animalId: parseInt(data.animal["@id"].replace(/^\D+/g, '')),
        date: data.date,
        user: {
            id: parseInt(data.user["@id"].replace(/^\D+/g, '')),
            roles: data.user.roles,
            email: data.user.email
        },
        animal: { ...data.animal, id: parseInt(data["@id"].replace(/^\D+/g, '')) }
    }
}

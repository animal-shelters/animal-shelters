export default interface Animal {
    id: number;
    species: string;
    breed: string;
    name: string;
    birthDate: Date;
    intakeDate: Date;
    description: string;
    highlightedImage: string;
}

export interface AnimalDto {
    "@id": string;
    species: string;
    breed: string;
    name: string;
    birthDate: Date;
    intakeDate: Date;
    description: string;
    highlightedImage: string;
}

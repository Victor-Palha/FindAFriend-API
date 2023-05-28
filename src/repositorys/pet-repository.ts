import { Pet, Prisma } from "@prisma/client";

export interface PetFetchRequest{
    species?: string
    race?: string
    castrated?: boolean
    vaccine_record?: boolean
}

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    fetchPet(data: PetFetchRequest, page: number): Promise<Pet[]>;
}
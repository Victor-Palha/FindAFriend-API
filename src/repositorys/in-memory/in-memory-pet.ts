import { Prisma, Pet, Situation } from "@prisma/client";
import { PetFetchRequest, PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository{
    public items: Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id_pet: randomUUID(),
            species: data.species,
            race: data.race,
            castrated: data.castrated,
            vaccine_record: data.vaccine_record,
            situation: 'ADOPTION' as Situation,
            org_id: data.org_id,
            user_id: null
        }

        this.items.push(pet)
        return pet
    }

    async fetchPet(data: PetFetchRequest, page: number) {
        const filters = [
            (item: Pet) => data.species === undefined || item.species.toLowerCase().includes(data.species.toLowerCase()),
            (item: Pet) => data.race === undefined || item.race.toLowerCase().includes(data.race.toLowerCase()),
            (item: Pet) => data.castrated === undefined || item.castrated === data.castrated,
            (item: Pet) => data.vaccine_record === undefined || item.vaccine_record === data.vaccine_record,
        ]

        const pets = this.items.filter(item => filters.reduce((acc, filter) => acc && filter(item), true))
        return pets.slice((page - 1) * 20 , page * 20)
    }

}
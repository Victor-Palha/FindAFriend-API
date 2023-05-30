import { Prisma, Pet } from "@prisma/client";
import { PetFetchRequest, PetRepository } from "../pet-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetRepository implements PetRepository{
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }
    async fetchPet(data: PetFetchRequest, page: number) {
        const pets = await prisma.pet.findMany({
            where:{
                castrated: data.castrated,
                race: data.race,
                species: data.species,
                vaccine_record: data.vaccine_record
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }
    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where:{
                id_pet: id
            }
        })

        return pet
    }
    async updatePet(id: string, data: Prisma.PetUncheckedUpdateInput) {
        const pet = await prisma.pet.update({
            where:{
                id_pet: id
            },
            data
        })

        return pet
    }
    
}
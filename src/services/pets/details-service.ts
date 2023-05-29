import { PetRepository } from "@/repositorys/pet-repository";
import { Pet } from "@prisma/client";

interface PetDetailsRequest{
    id_pet: string
}
interface PetDetailsResponse{
    pet: Pet
}
export class DetailsPetService {
    constructor(private petRepository: PetRepository){}
    async execute({id_pet}: PetDetailsRequest): Promise<PetDetailsResponse>{
        let pet = await this.petRepository.findById(id_pet)
        if(!pet){
            throw new Error('Pet not found')
        }
        //console.log(pet)
        return {pet}
    }
}
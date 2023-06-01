import { PetRepository } from "@/repositorys/pet-repository";
import { UserRepository } from "@/repositorys/users-repository";
import { Pet } from "@prisma/client";

interface AdoptionRequest{
    pet_id: string
    cpf: string
}

interface AdoptionResponse{
    pet: Pet
}

export class AdoptionService{
    constructor(private petRepository: PetRepository, private userRepository: UserRepository){}
    async execute({pet_id, cpf}: AdoptionRequest): Promise<AdoptionResponse>{
        const user = await this.userRepository.findByCpf(cpf)
        //console.log(user)
        if(!user){
            throw new Error('User not found')
        }
        const petSearch = await this.petRepository.findById(pet_id)
        if(!petSearch){
            throw new Error('Pet not found')
        }

        if(petSearch.user_id != null){
            throw new Error('Pet already adopted')
        }

        const pet = await this.petRepository.updatePet(pet_id, {user_id: user.id_user, situation: 'ADOPTED'})

        //console.log(pet)

        return { pet }
    }
}
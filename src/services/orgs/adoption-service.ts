import { PetRepository } from "@/repositorys/pet-repository";
import { UserRepository } from "@/repositorys/users-repository";
import { Pet } from "@prisma/client";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { PetNotFoundError } from "../errors/pet-not-found-error";
import { InvalidCredencialsError } from "../errors/invalid-credencials-error";

interface AdoptionRequest{
    pet_id: string
    cpf: string
    org_id: string
}

interface AdoptionResponse{
    pet: Pet
}

export class AdoptionService{
    constructor(private petRepository: PetRepository, private userRepository: UserRepository){}
    async execute({pet_id, cpf, org_id}: AdoptionRequest): Promise<AdoptionResponse>{
        const user = await this.userRepository.findByCpf(cpf)
        //console.log(user)
        if(!user){
            throw new UserNotFoundError()
        }
        const petSearch = await this.petRepository.findById(pet_id)
        if(!petSearch){
            throw new PetNotFoundError()
        }
        if(petSearch.org_id !== org_id){
            throw new InvalidCredencialsError()
        }

        if(petSearch.user_id != null){
            throw new Error('Pet already adopted')
        }

        const pet = await this.petRepository.updatePet(pet_id, {user_id: user.id_user, situation: 'ADOPTED'})

        //console.log(pet)

        return { pet }
    }
}
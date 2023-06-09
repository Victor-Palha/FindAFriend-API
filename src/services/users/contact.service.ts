import { OrgRepository } from "@/repositorys/org-repository";
import { PetRepository } from "@/repositorys/pet-repository";
import { PetNotFoundError } from "../errors/pet-not-found-error";

interface ContactPetRequest{
    id_pet: string
}

interface ContactReponse{
    whatsapp: string
}
export class ContactPetService{
    constructor(private petRepository: PetRepository, private orgRepository: OrgRepository){}
    async execute({id_pet}: ContactPetRequest): Promise<ContactReponse>{
        const pet = await this.petRepository.findById(id_pet)
        if(!pet || pet.situation !== 'ADOPTION'){
            throw new PetNotFoundError()
        }
        const org = await this.orgRepository.findById(pet.org_id)
        if(!org){
            throw new PetNotFoundError()
        }

        return {whatsapp: org.phone}
    }
}
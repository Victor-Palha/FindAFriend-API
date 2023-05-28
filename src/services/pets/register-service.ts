import { OrgRepository } from "@/repositorys/org-repository";
import { PetRepository } from "@/repositorys/pet-repository";
import { Pet, Situation } from "@prisma/client";
import { InvalidOrgError } from "./errors/invalid-org-error";

interface PetRegisterRequest{
    species: string
    race: string
    castrated: boolean
    vaccine_record: boolean
    org_id: string
}

interface PetRegisterResponse{
    pet: Pet
}


export class PetRegisterService{
    constructor(private petRepository: PetRepository, private orgRepository: OrgRepository){}

    async execute({species, race, castrated, org_id, vaccine_record}: PetRegisterRequest): Promise<PetRegisterResponse>{

        const org = await this.orgRepository.findById(org_id)

        if(!org){
            throw new InvalidOrgError
        }

        const pet = await this.petRepository.create({species, race, castrated, org_id, vaccine_record})

        return {pet}
    }
}
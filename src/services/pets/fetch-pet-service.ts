import { OrgRepository } from "@/repositorys/org-repository";
import { PetRepository } from "@/repositorys/pet-repository";
import { Pet } from "@prisma/client";
import { InvalidOrgError } from "./errors/invalid-org-error";

interface PetFetchRequest{
    city: string
    species?: string
    race?: string
    castrated?: boolean
    vaccine_record?: boolean
    page: number
}
interface PetFetchResponse{
    pets: Pet[]
}
export class FetchPetService {
    constructor(private petRepository: PetRepository, private orgRepository: OrgRepository){}
    async execute({city, species, race, castrated, vaccine_record, page}: PetFetchRequest): Promise<PetFetchResponse>{
        const fetchOrg = await this.orgRepository.findByCity(city.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase())
        
        const fetchPets = await this.petRepository.fetchPet({species, castrated, race, vaccine_record}, page)

        //console.log(fetchOrg)
        let pets = fetchPets.map((pet) => {
            const org = fetchOrg.find(org => org.id_org === pet.org_id)
            return {
                ...pet,
                org
            }
        })
        pets = pets.filter(pet => pet.org !== undefined && pet.situation === 'ADOPTION')

        //console.log(pets)


        return {pets}
    }
}
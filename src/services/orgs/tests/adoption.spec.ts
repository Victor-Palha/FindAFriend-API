import {beforeEach, describe, expect, it} from "vitest";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { InMemoryPetRepository } from "@/repositorys/in-memory/in-memory-pet";
import { AdoptionService } from "../adoption-service";
import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";


let inMemoryOrg: InMemoryOrgRepository
let inMemoryUser: InMemoryUserRepository
let inMemoryPet: InMemoryPetRepository
let sut: AdoptionService

describe("Adoption pet", ()=>{

    beforeEach(()=>{
        inMemoryOrg = new InMemoryOrgRepository()
        inMemoryPet = new InMemoryPetRepository()
        inMemoryUser = new InMemoryUserRepository()
        sut = new AdoptionService(inMemoryPet, inMemoryUser)
    })

    it("should be able link a pet to a user", async ()=>{
        const user = await inMemoryUser.create({
            name: "joão victor ferreira palha",
            email: "joedoe@test.com",
            cpf: "42355578925",
            password: "12345678"
        })
        const org = await inMemoryOrg.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "BellHell",
            phone: "(11) 1234-5678",
        })

        const petCreated = await inMemoryPet.create({
            species: "dog",
            castrated: true,
            org_id: org.id_org,
            race: "vira-lata",
            vaccine_record: false
        })

        const {pet} = await sut.execute({pet_id: petCreated.id_pet, cpf: user.cpf, org_id: org.id_org})

        expect(pet.situation).toBe("ADOPTED")
        expect(pet.user_id).toBe(user.id_user)
        
    })
})
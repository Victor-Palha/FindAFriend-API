import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";
import { UserRegisterService } from "../register-service";
import {beforeEach, describe, expect, it} from "vitest";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { InMemoryPetRepository } from "@/repositorys/in-memory/in-memory-pet";
import { ContactPetService } from "../contact.service";

let inMemoryOrg: InMemoryOrgRepository
let inMemoryPet: InMemoryPetRepository
let sut: ContactPetService

describe.skip("Contact to adoption", ()=>{

    beforeEach(()=>{
        inMemoryOrg = new InMemoryOrgRepository()
        inMemoryPet = new InMemoryPetRepository()
        sut = new ContactPetService(inMemoryPet, inMemoryOrg)
    })

    it("should be able to contact org to adopte a pet", async ()=>{
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

        const pet = await inMemoryPet.create({
            species: "dog",
            castrated: true,
            org_id: org.id_org,
            race: "vira-lata",
            vaccine_record: false
        })

        const { whatsapp } = await sut.execute({id_pet: pet.id_pet})

        expect(whatsapp).toBe(org.phone)
    })
})
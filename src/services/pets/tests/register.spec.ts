import { InMemoryPetRepository } from "@/repositorys/in-memory/in-memory-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { PetRegisterService } from "../register-service";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";

let inMemoryOrgRepository: InMemoryOrgRepository
let inMemoryPetRepository: InMemoryPetRepository
let sut: PetRegisterService
describe("Register Pet", ()=>{

    beforeEach(()=>{
        inMemoryOrgRepository = new InMemoryOrgRepository()
        inMemoryPetRepository = new InMemoryPetRepository()
        sut = new PetRegisterService(inMemoryPetRepository, inMemoryOrgRepository)
    })

    it("Should be able to register a pet", async ()=>{
        const org = await inMemoryOrgRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "BellHell",
            phone: "(11) 1234-5678",
        })

        const { pet } = await sut.execute({
            species: "dog",
            castrated: true,
            org_id: org.id_org,
            race: "vira-lata",
            vaccine_record: false
        })

        //console.log(pet)

        expect(pet).toHaveProperty("id_pet")
    })
})
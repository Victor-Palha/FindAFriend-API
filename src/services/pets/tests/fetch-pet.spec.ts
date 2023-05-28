import { InMemoryPetRepository } from "@/repositorys/in-memory/in-memory-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { PetRegisterService } from "../register-service";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { FetchPetService } from "../fetch-pet-service";

let inMemoryOrgRepository: InMemoryOrgRepository
let inMemoryPetRepository: InMemoryPetRepository
let sut: FetchPetService
describe("Fetch Pet", ()=>{

    beforeEach(()=>{
        inMemoryOrgRepository = new InMemoryOrgRepository()
        inMemoryPetRepository = new InMemoryPetRepository()
        sut = new FetchPetService(inMemoryPetRepository, inMemoryOrgRepository)
    })

    it("Should be able to fetch a pet by city", async ()=>{
        const orgBelem = await inMemoryOrgRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
            phone: "(11) 1234-5678",
        })
        const orgSP = await inMemoryOrgRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "48643964000184",
            cep: "03220300",
            city: "São Paulo".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
            phone: "(11) 1234-5678",
        })
        //console.log(orgSP)
        

        await inMemoryPetRepository.create({
            species: "dog",
            castrated: true,
            org_id: orgBelem.id_org,
            race: "vira-lata",
            vaccine_record: false
        })
        
        await inMemoryPetRepository.create({
            species: "cat",
            castrated: true,
            org_id: orgSP.id_org,
            race: "vira-lata",
            vaccine_record: true
        })


        const { pets } = await sut.execute({city: "Belém", page: 1})

        //console.log(pet)

        expect(pets.length).toBe(1)
    })
})
import { InMemoryPetRepository } from "@/repositorys/in-memory/in-memory-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { DetailsPetService } from "../details-service";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";

let inMemoryOrgRepository: InMemoryOrgRepository
let inMemoryPetRepository: InMemoryPetRepository
let sut: DetailsPetService
describe("Pets details", () => {
    beforeEach(()=>{
        inMemoryOrgRepository = new InMemoryOrgRepository(),
        inMemoryPetRepository = new InMemoryPetRepository(),
        sut = new DetailsPetService(inMemoryPetRepository)
    })

    it("Should be able to return a pet by Id", async ()=>{

        const petCreated = await inMemoryPetRepository.create({
            species: "dog",
            castrated: true,
            org_id: "132456",
            race: "vira-lata",
            vaccine_record: false
        })
        const id_pet = petCreated.id_pet

        const { pet } = await sut.execute({id_pet})

        expect(pet.species).toBe("dog")
    })

    it("Should not be able to return a pet by Id if it does not exist", async ()=>{
        await inMemoryPetRepository.create({
            species: "dog",
            castrated: true,
            org_id: "123123",
            race: "vira-lata",
            vaccine_record: false
        })


        expect(async ()=>{
            await sut.execute({id_pet: "123"})
        }).rejects.toBeInstanceOf(Error)
    })
})
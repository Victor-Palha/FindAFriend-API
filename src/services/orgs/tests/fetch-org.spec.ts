import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { FetchOrgService } from "../fetch-org-service";

let inMemoryOrgsRepository: InMemoryOrgRepository;
let sut: FetchOrgService
describe("Fetch Orgs", ()=>{
    beforeEach(()=>{
        inMemoryOrgsRepository = new InMemoryOrgRepository()
        sut = new FetchOrgService(inMemoryOrgsRepository)
    })
    it("should be able to fetch orgs by city", async ()=>{
        await inMemoryOrgsRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
            phone: "(11) 1234-5678",
        })

        await inMemoryOrgsRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "48643964000184",
            cep: "03220300",
            city: "São Paulo".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
            phone: "(11) 1234-5678",
        })

        const {orgs} = await sut.execute("Belém")

        expect(orgs[0].cnpj).toEqual("03636198000192")
    })
})
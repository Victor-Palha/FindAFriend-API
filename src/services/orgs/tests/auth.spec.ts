import { beforeEach, describe, expect, it } from "vitest";
import { OrgAuthService } from "../auth-service";
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { hash } from "bcryptjs";

let inMemoryOrgRepository: InMemoryOrgRepository
let sut: OrgAuthService

describe("Auth Org", ()=>{
    beforeEach(()=>{
        inMemoryOrgRepository = new InMemoryOrgRepository()
        sut = new OrgAuthService(inMemoryOrgRepository)
    })

    it("should be able to auth an org", async ()=>{
        await inMemoryOrgRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: await hash("12345678", 8),
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "BellHell",
            phone: "(11) 1234-5678",
        })

        const {org} = await sut.execute({
            email: "faf@test.com",
            password: "12345678"
        })

        expect(org).toHaveProperty("id_org")
    })

    it("should not be able to auth an org with wrong email", async ()=>{
        await inMemoryOrgRepository.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: await hash("12345678", 8),
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém",
            phone: "(11) 1234-5678",
        })

        expect(async ()=>{
            await sut.execute({
                email: "faf@teste.com",
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
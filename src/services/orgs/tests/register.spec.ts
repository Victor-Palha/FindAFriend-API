import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgRegisterService } from "../register-service";
import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";

let inMemoryOrgRepository: InMemoryOrgRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: OrgRegisterService


describe("Org Register", ()=>{
    beforeEach(()=>{
        inMemoryOrgRepository = new InMemoryOrgRepository()
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new OrgRegisterService(inMemoryOrgRepository, inMemoryUserRepository)
    })

    it("should be able to register a new org", async ()=>{
        const { org } = await sut.execute({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém",
            phone: "(11) 1234-5678",
        })

        expect(org).toHaveProperty("id_org")
    })

    it("should not be able to register a org with same cnpj", async ()=>{
        await sut.execute({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém",
            phone: "(11) 1234-5678",
        })

        expect(async ()=>{
            await sut.execute({
                name: "MPF GABINETE DO MINISTRO",
                email: "faf@test.com",
                password: "12345678",
                address: "Rua imaginaria, 123",
                cnpj: "03636198000192",
                cep: "12345678",
                city: "Belém",
                phone: "(11) 1234-5678",
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
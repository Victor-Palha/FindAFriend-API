import { beforeEach, describe, expect, it } from "vitest";
import {AuthService} from "./auth-service"
import { InMemoryOrgRepository } from "@/repositorys/in-memory/in-memory-org";
import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";
import { hash } from "bcryptjs";


let inMemoryDatabaseOrg: InMemoryOrgRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthService

describe("Auth", ()=>{
    beforeEach(()=>{
        inMemoryDatabaseOrg = new InMemoryOrgRepository()
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new AuthService(inMemoryUserRepository, inMemoryDatabaseOrg)
    })

    it("should be able to authenticate a user", async ()=>{
        const user = await inMemoryUserRepository.create({
            name: "joão victor ferreira palha",
            email: "joedoe@test.com",
            cpf: process.env.CPF_TEST as string,
            password: await hash("12345678", 8),
        })

        let { auth } = await sut.execute({email: "joedoe@test.com", password: "12345678"})
        expect(auth.id).toBe(user.id_user)

    })

    it("should be able to authenticate a org", async ()=>{
        const org = await inMemoryDatabaseOrg.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: await hash("12345678", 8),
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém",
            phone: "(11) 1234-5678"
        })

        let { auth } = await sut.execute({email: "faf@test.com", password: "12345678"})
        expect(auth.id).toBe(org.id_org)
    })

    it("should not be able to authenticate a user with wrong password", async ()=>{
        await inMemoryDatabaseOrg.create({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: await hash("12345678", 8),
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém",
            phone: "(11) 1234-5678"
        })

        expect(async ()=>{
            await sut.execute({email: "faf@test.com", password: "123456789"})
        }).rejects.toBeInstanceOf(Error)
    })
})
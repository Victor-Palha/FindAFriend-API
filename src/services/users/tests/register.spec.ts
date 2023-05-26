import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";
import { UserRegisterService } from "../register-service";
import {beforeEach, describe, expect, it} from "vitest";

let inMemoryDatabase: InMemoryUserRepository
let sut: UserRegisterService

describe.skip("Register User", ()=>{

    beforeEach(()=>{
        inMemoryDatabase = new InMemoryUserRepository()
        sut = new UserRegisterService(inMemoryDatabase)
    })

    it("should be able to register a user", async ()=>{
        const { user } = await sut.execute({
            name: "joão victor ferreira palha",
            email: "joedoe@test.com",
            cpf: process.env.CPF_TEST as string,
            password: "12345678",
            birthdate: "2002-11-28"
        })

        expect(user).toHaveProperty("id_user")
    })

    it("should not be able to register a user with same cpf", async ()=>{
        await sut.execute({
            name: "joão victor ferreira palha",
            email: "joedoe@test.com",
            cpf: process.env.CPF_TEST as string,
            password: "12345678",
            birthdate: "2002-11-28"
        })

        expect(async ()=>{
            await sut.execute({
                name: "joão victor ferreira palha",
                email: "joedoe@test.com",
                cpf: process.env.CPF_TEST as string,
                password: "12345678",
                birthdate: "2002-11-28"
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it("should not be able to register a user with same email", async ()=>{
        await sut.execute({
            name: "joão victor ferreira palha",
            email: "joedoe@test.com",
            cpf: process.env.CPF_TEST as string,
            password: "12345678",
            birthdate: "2002-11-28"
        })

        expect(async ()=>{
            await sut.execute({
                name: "joão victor ferreira palha",
                email: "joedoe@test.com",
                cpf: process.env.CPF_TEST as string,
                password: "12345678",
                birthdate: "2002-11-28"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
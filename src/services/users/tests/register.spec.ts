import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";
import { UserRegisterService } from "../register-service";
import {beforeEach, describe, expect, it} from "vitest";

let inMemoryDatabase: InMemoryUserRepository
let sut: UserRegisterService

describe("Register User", ()=>{

    beforeEach(()=>{
        inMemoryDatabase = new InMemoryUserRepository()
        sut = new UserRegisterService(inMemoryDatabase)
    })

    it("should be able to register a user", async ()=>{
        const { user } = await sut.execute({
            name: "Joe Doe",
            email: "joedoe@test.com",
            cpf: "00000000000",
            password: "12345678"
        })

        expect(user).toHaveProperty("id_user")
    })

    it("should not be able to register a user with same cpf", async ()=>{
        await sut.execute({
            name: "Joe Doe",
            email: "joedoe@test1.com",
            cpf: "00000000000",
            password: "12345678"
        })

        expect(async ()=>{
            await sut.execute({
                name: "Joe Doe",
                email: "joedoe@test.com",
                cpf: "00000000000",
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it("should not be able to register a user with same email", async ()=>{
        await sut.execute({
            name: "Joe Doe",
            email: "joedoe@test.com",
            cpf: "00000000001",
            password: "12345678"
        })

        expect(async ()=>{
            await sut.execute({
                name: "Joe Doe",
                email: "joedoe@test.com",
                cpf: "00000000000",
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
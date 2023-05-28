import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAuthService } from "../auth-service";
import { hash } from "bcryptjs";

let inMemoryDatabase: InMemoryUserRepository
let sut: UserAuthService
describe("Auth User", ()=>{
    beforeEach(()=>{
        inMemoryDatabase = new InMemoryUserRepository()
        sut = new UserAuthService(inMemoryDatabase)
    })

    it("should be able to auth a user", async ()=>{
        await inMemoryDatabase.create({
            name: "Joe Doe",
            email: "joedoe@test.com",
            cpf: "00000000000",
            password: await hash("12345678", 8)
        })

        const { user } = await sut.execute({
            email: "joedoe@test.com",
            password: "12345678"
        })

        expect(user).toHaveProperty("id_user")
    })
})
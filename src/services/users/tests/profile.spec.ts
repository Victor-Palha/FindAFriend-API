import { InMemoryUserRepository } from "@/repositorys/in-memory/in-memory-user";
import { beforeEach, describe, expect, it } from "vitest";
import { UserProfileService } from "../profile-service";
import { hash } from "bcryptjs";


let inMemoryDatabase: InMemoryUserRepository
let sut: UserProfileService
describe("Profile User", ()=>{
    beforeEach(()=>{
        inMemoryDatabase = new InMemoryUserRepository()
        sut = new UserProfileService(inMemoryDatabase)
    })

    it("should be able to get a user profile", async ()=>{
        const userInfo = await inMemoryDatabase.create({
            name: "Joe Doe",
            email: "joedoe@test.com",
            cpf: "00000000000",
            password: await hash("12345678", 8)
        })

        const {user} = await sut.execute({user_id: userInfo.id_user})

        expect(user.cpf).toEqual("00000000000")
    })
})
import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Adoption (e2e)", () =>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to adopt a pet", async () =>{
        const user = await prisma.user.create({
            data:{
                name: "João victor ferreira palha",
                email: "ash@test.com",
                password: "123456789",
                cpf: process.env.CPF_TEST as string,
            }
        })
        //console.log(user.cpf)

        const org = await prisma.org.create({
            data:{
                name: "MPF GABINETE DO MINISTRO",
                email: "faf@test.com",
                password: await hash("12345678", 8),
                address: "Rua imaginaria, 123",
                cnpj: "03636198000192",
                cep: "66025610",
                city: "Belém",
                phone: "(11) 1234-5678",
            }
        })

        const pet = await prisma.pet.create({
            data: {
                species: "dog",
                castrated: true,
                org_id: org.id_org,
                race: "vira-lata",
                vaccine_record: false
            }
        })
        //console.log(pet.id_pet)

        const responseToken = await request(app.server).post("/signin").send({
            email: "faf@test.com",
            password: "12345678"
        }).expect(200)

        const {token} = responseToken.body

        const response = await request(app.server).patch(`/org/${user.cpf}/${pet.id_pet}`).set("Authorization", `Bearer ${token}`)
        //console.log(response)

        expect(response.body.pet.situation).toBe("ADOPTED")
        expect(response.body.pet.user_id).toBe(user.id_user)

    })
})
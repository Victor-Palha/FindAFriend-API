import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Contact to adoption (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to contact a org to adopt a pet", async ()=>{
        const org = await prisma.org.create({
            data:{
                name: "MPF GABINETE DO MINISTRO",
                email: "faf@test.com",
                password: "12345678",
                address: "Rua imaginaria, 123",
                cnpj: "03636198000192",
                cep: "66025610",
                city: "Belém",
                phone: "(11) 1234-5678",
            }
        })
        const pet = await prisma.pet.create({
            data:{
                species: "dog",
                castrated: true,
                org_id: org.id_org,
                race: "vira-lata",
                vaccine_record: false
            }
        })

        await prisma.user.create({
            data:{
                name: "João victor ferreira palha",
                email: "ash@test.com",
                password: await hash("123456789", 8),
                cpf: process.env.CPF_TEST as string
            }
        })
        //console.log(response)
        const responseToken = await request(app.server).post("/signin").send({
            email: "ash@test.com",
            password: "123456789",
        })

        const {token} = responseToken.body

        const response = await request(app.server).get(`/contact/${pet.id_pet}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.whatsapp).toBe("(11) 1234-5678")

        //expect(response.status).toBe(201)
    })
})
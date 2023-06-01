import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Pet Register (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to register a pet", async ()=>{
        const org = await prisma.org.create({
            data:{
                name: "MPF GABINETE DO MINISTRO",
                email: "faf@test.com",
                password: await hash("123456789", 8),
                address: "Rua imaginaria, 123",
                cnpj: "03636198000192",
                cep: "66025610",
                city: "Belém",
                phone: "(11) 1234-5678",
            }
        })

        const responseToken = await request(app.server).post("/signin").send({
            email: "faf@test.com",
            password: "123456789",
        })
        
        const {token} = responseToken.body

        const response = await request(app.server).post("/pet").send({
            species: "dog",
            castrated: true,
            org_id: org.id_org,
            race: "vira-lata",
            vaccine_record: false
        }).set("Authorization", `Bearer ${token}`)
    
        expect(response.status).toBe(201)
        expect(response.body.pet.race).toBe("vira-lata")

    })
})
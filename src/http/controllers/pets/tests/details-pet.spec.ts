import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Details Pet (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to fetch pets", async ()=>{
        const org = await prisma.org.create({
            data:{
                name: "MPF GABINETE DO MINISTRO",
                email: "faf@test.com",
                password: await hash("123456789", 8),
                address: "Rua imaginaria, 123",
                cnpj: "03636198000192",
                cep: "66025610",
                city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
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

        const response = await request(app.server).get(`/pet/${pet.id_pet}`)
    
        expect(response.status).toBe(200)
        expect(response.body.pet.species).toBe("dog")

    })
})
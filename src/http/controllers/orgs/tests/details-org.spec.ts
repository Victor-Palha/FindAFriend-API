import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Org Profile (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to get a org profile", async ()=>{
        const org = await prisma.org.create({
            data:{
                name: "teste 01",
                email: "faf@test.com",
                password: "12345678",
                address: "Rua imaginaria, 123",
                cnpj: "03636198000191",
                cep: "66025610",
                city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
                phone: "(11) 1234-5671",
            }
        })
        //console.log(response)
        const response = await request(app.server).get(`/org/${org.id_org}`)

        expect(response.status).toBe(200)
        expect(response.body.org.id_org).toBe(org.id_org)

        //expect(response.status).toBe(201)
    })
})
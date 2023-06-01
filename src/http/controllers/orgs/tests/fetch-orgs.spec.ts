import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Org fetch (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to fetch orgs by city", async ()=>{
        await prisma.org.createMany({
            data:[{
                name: "teste 01",
                email: "faf@test.com",
                password: "12345678",
                address: "Rua imaginaria, 123",
                cnpj: "03636198000191",
                cep: "66025610",
                city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
                phone: "(11) 1234-5671",
        },{
            name: "Teste 02",
            email: "faf1@test.com",
            password: "12345678",
            address: "Rua imaginaria, 456",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
            phone: "(11) 1234-5672",
        },{
            name: "teste 03",
            email: "faf2@test.com",
            password: "12345678",
            address: "Rua imaginaria, 789",
            cnpj: "03636198000193",
            cep: "66025610",
            city: "Belém".normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase(),
            phone: "(11) 1234-5673",
        }]
    })

    const response = await request(app.server).get("/orgs/fetch").query({
        city: "Belém"
    })
    //console.log(response.body.org)
        //console.log(response)

        expect(response.status).toBe(200)
        expect(response.body.orgs).toHaveLength(3)
    })
})
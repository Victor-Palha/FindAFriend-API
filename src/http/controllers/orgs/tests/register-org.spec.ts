import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Org Register (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should register a new Org", async ()=>{
        const response = await request(app.server).post("/signup/org").send({
            name: "MPF GABINETE DO MINISTRO",
            email: "faf@test.com",
            password: "12345678",
            address: "Rua imaginaria, 123",
            cnpj: "03636198000192",
            cep: "66025610",
            city: "Belém",
            phone: "(11) 1234-5678",
        })
        //console.log(response)

        expect(response.status).toBe(201)
    })
})
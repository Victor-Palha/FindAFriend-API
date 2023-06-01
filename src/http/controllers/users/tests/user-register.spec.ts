import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("User Register (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should register a new user", async ()=>{
        const response = await request(app.server).post("/signup/user").send({
            name: "João victor ferreira palha",
            email: "ash@test.com",
            password: "123456789",
            cpf: process.env.CPF_TEST,
            birthdate: "2002-11-28",
        })
        //console.log(response)

        expect(response.status).toBe(201)
    })
})
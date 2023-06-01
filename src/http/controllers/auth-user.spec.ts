import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Auth User (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to login a user", async ()=>{
        await prisma.user.create({
            data: {
                name: "João victor ferreira palha",
                email: "ash@test.com",
                password: await hash("123456789", 8),
                cpf: process.env.CPF_TEST as string,
            }
        })
        //console.log(response)
        const response = await request(app.server).post("/signin").send({
            email: "ash@test.com",
            password: "123456789",
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
    })
})
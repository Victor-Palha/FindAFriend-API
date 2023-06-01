import "dotenv/config"
import { app } from "@/app";
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("User Profile (e2e)", ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })

    it("should be able to get a user profile", async ()=>{
        await prisma.user.create({
            data:{
                name: "João victor ferreira palha",
                email: "ash@test.com",
                password: await hash("123456789", 8),
                cpf: process.env.CPF_TEST as string
            }
        })
        //console.log(response)
        const response = await request(app.server).post("/signin").send({
            email: "ash@test.com",
            password: "123456789",
        })

        const {token} = response.body

        const profileResponse = await request(app.server).get("/profile/user").set("Authorization", `Bearer ${token}`)

        expect(profileResponse.status).toBe(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            name: "João victor ferreira palha",
        }))

        //expect(response.status).toBe(201)
    })
})
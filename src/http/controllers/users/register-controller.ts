import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userRegister(req:FastifyRequest, res: FastifyReply){

    const registerUserSchemaBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        cpf: z.string().length(11)
    })

    const {name, email, password, cpf} = registerUserSchemaBody.parse(req.body)

    return res.status(201).send({
        name,
        email,
        password,
        cpf
    })
}
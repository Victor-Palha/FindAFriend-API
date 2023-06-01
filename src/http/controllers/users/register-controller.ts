import { makeRegisterUserService } from "@/services/users/factories/make-register-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userRegister(req:FastifyRequest, res: FastifyReply){

    const registerUserSchemaBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        cpf: z.string().length(11),
        birthdate: z.string().length(10)
    })

    const {name, email, password, cpf, birthdate} = registerUserSchemaBody.parse(req.body)


    try {
        const userRegisterService = makeRegisterUserService()
        await userRegisterService.execute({name, email, password, cpf, birthdate})

    } catch (error) {
        if(error instanceof Error){
            return res.status(400).send({message: error.message})
        }
    }

    return res.status(201).send()
}
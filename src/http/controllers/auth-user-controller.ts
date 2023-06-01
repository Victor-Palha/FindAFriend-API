import { makeAuthUserService } from "@/services/users/factories/make-auth-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function AuthUser(req:FastifyRequest, res:FastifyReply){
    const authUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password} = authUserSchema.parse(req.body)

    try {
        const authUserService = makeAuthUserService()
        const {auth} = await authUserService.execute({email, password})

        const token = await res.jwtSign({
            role: auth.type,
        },{
            sign: {
                sub: auth.id
            }
        })

        return res.status(200).send({token})
    } catch (error) {
        if (error instanceof Error){
            return res.status(400).send({error: error.message})
        }

        throw error
    }
}
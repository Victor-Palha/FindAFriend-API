import { makeProfileUserService } from "@/services/users/factories/make-profile-user-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileUser(req: FastifyRequest, res: FastifyReply){

    const profileUserService = makeProfileUserService()
    const { user } = await profileUserService.execute({user_id: req.user.sub})

    return res.status(200).send({user: {
        ...user,
        password: undefined
    }})
}
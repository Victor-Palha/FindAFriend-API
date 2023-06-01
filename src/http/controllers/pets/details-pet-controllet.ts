import { makeDetailsPetService } from "@/services/pets/factories/make-details-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function detailsPet(req:FastifyRequest, res:FastifyReply){
    const detailsPetSchemaParams = z.object({
        id_pet: z.string().uuid()
    })
    const {id_pet} = detailsPetSchemaParams.parse(req.params)

    const detailsPetService = makeDetailsPetService()

    const {pet} = await detailsPetService.execute({id_pet})

    return res.status(200).send({pet})
}
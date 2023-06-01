import { makeContactService } from "@/services/users/factories/make-contact-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function contactToAdoption(req:FastifyRequest, res:FastifyReply){
    const contactSchemaParams = z.object({
        id_pet: z.string().uuid(),
    })
    const contactService = makeContactService()
    const {id_pet} = contactSchemaParams.parse(req.params)

    const {whatsapp} = await contactService.execute({id_pet})

    return res.status(200).send({whatsapp})
}
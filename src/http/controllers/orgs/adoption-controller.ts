import { makeAdoptionPetService } from "@/services/orgs/factories/make-adoption-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function adoptionPet(req:FastifyRequest, res:FastifyReply){
    const adoptionPetSchemaParams = z.object({
        pet_id: z.string().uuid(),
        cpf: z.string().length(11)
    })

    const org_id = req.user.sub

    const { pet_id, cpf } = adoptionPetSchemaParams.parse(req.params)

    const adoptionPetService = makeAdoptionPetService()

    const {pet} = await adoptionPetService.execute({pet_id, cpf, org_id})
    //console.log(pet)

    return res.status(200).send({pet})
}
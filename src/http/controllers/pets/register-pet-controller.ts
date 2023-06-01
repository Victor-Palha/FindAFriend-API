import { makeRegisterPetService } from "@/services/pets/factories/make-register-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(req:FastifyRequest, res:FastifyReply){

    const registerPetSchemaBody = z.object({
        species: z.string(),
        race: z.string(),
        castrated: z.boolean(),
        vaccine_record: z.boolean(),
    })

    const org_id = req.user.sub
    
    const {castrated, race, species, vaccine_record} = registerPetSchemaBody.parse(req.body)
    const registerPetService = makeRegisterPetService()

    const { pet } = await registerPetService.execute({castrated, org_id, race, species, vaccine_record})

    return res.status(201).send({pet})
}
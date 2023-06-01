import { makeFetchPetService } from "@/services/pets/factories/make-fetch-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPets(req:FastifyRequest, res:FastifyReply){
    const fetchPetSchemaQuery = z.object({
        city: z.string(),
        species: z.string().optional(),
        race: z.string().optional(),
        castrated: z.coerce.boolean().optional(),
        vaccine_record: z.coerce.boolean().optional(),
        page: z.coerce.number()
    })

    const {city, page, castrated, race, species, vaccine_record} = fetchPetSchemaQuery.parse(req.query)

    const fetchPetService = makeFetchPetService()

    const {pets} = await fetchPetService.execute({city, page, castrated, race, species, vaccine_record})

    //console.log(pets)

    return res.status(200).send({pets})
}
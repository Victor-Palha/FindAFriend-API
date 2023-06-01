import { makeFetchOrgService } from "@/services/orgs/factories/makeFetchOrgService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchOrgs(req:FastifyRequest, res:FastifyReply){
    const fetchCitySchemaQuery = z.object({
        city: z.string(),
    })

    const {city} = fetchCitySchemaQuery.parse(req.query)

    const cityNormalized = city.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase()

    const fetchOrgsService = makeFetchOrgService()

    const { orgs } = await fetchOrgsService.execute(cityNormalized)
    //console.log(orgs)
    return res.status(200).send({orgs})
}
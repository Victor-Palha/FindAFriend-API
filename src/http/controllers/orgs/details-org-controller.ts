import { makeDetailsOrgService } from "@/services/orgs/factories/make-details-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function detailsOrg(req:FastifyRequest, res:FastifyReply){
    const detailsOrgSchemaParmas = z.object({
        id: z.string().uuid()
    })

    const {id} = detailsOrgSchemaParmas.parse(req.params)

    const detailsOrgService = makeDetailsOrgService()

    const {org} = await detailsOrgService.execute(id)

    return res.status(200).send({org})
}
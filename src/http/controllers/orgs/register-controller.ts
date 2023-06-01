import { makeRegisterOrgService } from "@/services/orgs/factories/make-register-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerOrg(req:FastifyRequest, res:FastifyReply){
    const registerOrgSchemaBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string(),
        cnpj: z.string().length(14),
        cep: z.string().length(8),
        city: z.string(),
        phone: z.string(),
    })

    const {name, email, password, address, cnpj, cep, city, phone} = registerOrgSchemaBody.parse(req.body)

    const registerOrgService = makeRegisterOrgService()
    const cityNormalized = city.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase()

    const org = await registerOrgService.execute({
        name,
        email,
        password,
        address,
        cnpj,
        cep,
        city: cityNormalized,
        phone
    })

    return res.status(201).send()
}
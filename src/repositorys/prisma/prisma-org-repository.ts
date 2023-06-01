import { Prisma, Org } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgRepository implements OrgRepository{
    async create(data: Prisma.OrgUncheckedCreateInput) {
        const org = await prisma.org.create({
            data
        })

        return org
    }
    async findByCNPJ(cnpj: string) {
        const org = await prisma.org.findUnique({
            where:{
                cnpj
            }
        })

        return org
        
    }
    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({
            where:{
                email
            }
        })

        return org
    }
    async findById(id: string) {
        const org = await prisma.org.findUnique({
            where:{
                id_org: id
            },include:{
                pet:true
            }
        })

        return org
    }
    async findByCity(city: string) {
        const org = await prisma.org.findMany({
            where:{
                city
            }
        })

        return org
    }
    
}
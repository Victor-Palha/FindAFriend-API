import { Prisma, Org } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgRepository implements OrgRepository{
    public items: Org[] = []
    async create(data: Prisma.OrgUncheckedCreateInput){
        const org = {
            id_org: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            address: data.address,
            cnpj: data.cnpj,
            cep: data.cep,
            city: data.city,
            phone: data.phone,
            created_at: new Date(),
        }

        this.items.push(org)
        return org
    }
    async findByCNPJ(cnpj: string) {
        const org = this.items.find(org => org.cnpj === cnpj)
        return org || null
    }
    async findByEmail(email: string){
        const org = this.items.find(org => org.email === email)
        return org || null
    }

}
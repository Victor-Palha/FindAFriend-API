import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
    create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
    findByCNPJ(cnpj: string): Promise<Org | null>;
    findByEmail(email: string): Promise<Org | null>;
    findById(id: string): Promise<Org | null>;
    findByCity(city: string): Promise<Org[]>;
}
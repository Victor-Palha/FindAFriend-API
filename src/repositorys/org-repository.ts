import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
    create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
    findByCNPJ(cnpj: string): Promise<Org | null>;
    findByEmail(email: string): Promise<Org | null>;
}
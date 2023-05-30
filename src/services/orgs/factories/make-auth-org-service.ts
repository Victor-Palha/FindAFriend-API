import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { OrgAuthService } from "../auth-service";

export function makeAuthOrgService(){
    const orgRepository = new PrismaOrgRepository()
    const service = new OrgAuthService(orgRepository)

    return service
}
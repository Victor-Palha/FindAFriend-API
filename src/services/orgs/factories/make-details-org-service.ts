import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { DetailsOrgService } from "../details-org-service";

export function makeDetailsOrgService(){
    const orgRepository = new PrismaOrgRepository()
    const service = new DetailsOrgService(orgRepository)

    return service
}
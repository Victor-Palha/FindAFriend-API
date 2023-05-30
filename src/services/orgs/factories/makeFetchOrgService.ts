import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { FetchOrgService } from "../fetch-org-service";

export function makeFetchOrgService(){
    const orgRepository = new PrismaOrgRepository()
    const service = new FetchOrgService(orgRepository)

    return service
}
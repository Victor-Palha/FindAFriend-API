import { PrismaPetRepository } from "@/repositorys/prisma/prisma-pet-repository";
import { FetchPetService } from "../fetch-pet-service";
import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";

export function makeFetchPetService(){
    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()
    const service = new FetchPetService(petRepository, orgRepository)

    return service
}
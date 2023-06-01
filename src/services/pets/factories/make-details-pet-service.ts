import { PrismaPetRepository } from "@/repositorys/prisma/prisma-pet-repository";
import { FetchPetService } from "../fetch-pet-service";
import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { DetailsPetService } from "../details-service";

export function makeDetailsPetService(){
    const petRepository = new PrismaPetRepository()
    const service = new DetailsPetService(petRepository)

    return service
}
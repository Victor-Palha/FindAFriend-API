import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { ContactPetService } from "../contact.service";
import { PrismaPetRepository } from "@/repositorys/prisma/prisma-pet-repository";

export function makeContactService(){
    const orgRepository = new PrismaOrgRepository()
    const petRepository = new PrismaPetRepository()
    const service = new ContactPetService(petRepository, orgRepository)

    return service
}
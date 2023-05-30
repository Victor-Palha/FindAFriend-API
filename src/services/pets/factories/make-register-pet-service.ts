import { PrismaPetRepository } from "@/repositorys/prisma/prisma-pet-repository";
import { PetRegisterService } from "../register-service";
import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";

export function makeRegisterPetService(){
    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()
    const service = new PetRegisterService(petRepository, orgRepository)

    return service
}
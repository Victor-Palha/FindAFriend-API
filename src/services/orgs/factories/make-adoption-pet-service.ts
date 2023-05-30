import { PrismaPetRepository } from "@/repositorys/prisma/prisma-pet-repository";
import { AdoptionService } from "../adoption-service";
import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";

export function makeAdoptionPetService() {
    const petRepository = new PrismaPetRepository()
    const userRepository = new PrismaUserRepository()
    const service = new AdoptionService(petRepository, userRepository)

    return service
}
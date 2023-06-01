import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";
import { AuthService } from "../../auth-service";
import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";

export function makeAuthUserService(){
    const userRepository = new PrismaUserRepository()
    const orgRepository = new PrismaOrgRepository()
    const service = new AuthService(userRepository, orgRepository)

    return service
}
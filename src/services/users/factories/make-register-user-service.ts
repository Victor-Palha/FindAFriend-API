import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";
import { UserRegisterService } from "../register-service";
import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";

export function makeRegisterUserService(){
    const userRepository = new PrismaUserRepository()
    const orgRepository = new PrismaOrgRepository()
    const service = new UserRegisterService(userRepository, orgRepository)

    return service
}
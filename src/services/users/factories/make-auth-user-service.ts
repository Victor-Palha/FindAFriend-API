import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";
import { UserAuthService } from "../auth-service";

export function makeAuthUserService(){
    const userRepository = new PrismaUserRepository()
    const service = new UserAuthService(userRepository)

    return service
}
import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";
import { UserRegisterService } from "../register-service";

export function makeRegisterUserService(){
    const userRepository = new PrismaUserRepository()
    const service = new UserRegisterService(userRepository)

    return service
}
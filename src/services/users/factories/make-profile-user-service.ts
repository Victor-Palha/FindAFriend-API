import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";
import { UserProfileService } from "../profile-service";

export function makeProfileUserService(){
    const userRepository = new PrismaUserRepository()
    const service = new UserProfileService(userRepository)

    return service
}
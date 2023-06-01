import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { OrgRegisterService } from "../register-service";
import { PrismaUserRepository } from "@/repositorys/prisma/prisma-user-repository";

export function makeRegisterOrgService() {
    const orgRepository = new PrismaOrgRepository();
    const userRepository = new PrismaUserRepository();
    const service = new OrgRegisterService(orgRepository, userRepository);
    return service;
}
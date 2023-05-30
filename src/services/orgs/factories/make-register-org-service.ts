import { PrismaOrgRepository } from "@/repositorys/prisma/prisma-org-repository";
import { OrgRegisterService } from "../register-service";

export function makeRegisterOrgService() {
    const orgRepository = new PrismaOrgRepository();
    const service = new OrgRegisterService(orgRepository);
    return service;
}
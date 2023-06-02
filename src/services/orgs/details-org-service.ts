import { OrgRepository } from "@/repositorys/org-repository";
import { OrgNotFoundError } from "../errors/org-not-found-error";

export class DetailsOrgService {
    constructor(private orgRepository: OrgRepository){}
    async execute(id: string){
        const org = await this.orgRepository.findById(id)
        if(!org){
            throw new OrgNotFoundError()
        }

        return {org}
    }
}
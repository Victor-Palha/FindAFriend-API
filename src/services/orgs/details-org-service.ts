import { OrgRepository } from "@/repositorys/org-repository";

export class DetailsOrgService {
    constructor(private orgRepository: OrgRepository){}
    async execute(id: string){
        const org = await this.orgRepository.findById(id)
        if(!org){
            throw new Error("Org not found")
        }

        return {org}
    }
}
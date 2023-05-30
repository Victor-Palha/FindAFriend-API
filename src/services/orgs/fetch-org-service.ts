import { OrgRepository } from "@/repositorys/org-repository"
import { Org } from "@prisma/client"

interface OrgFetchResponse{
    orgs: Org[]
}

export class FetchOrgService{
    constructor(private orgRepository: OrgRepository){}
    async execute(city: string): Promise<OrgFetchResponse>{
        const orgs = await this.orgRepository.findByCity(city.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase())
        if(orgs.length === 0){
            throw new Error("No orgs found")
        }
        return { orgs }
    }
}
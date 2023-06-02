import { OrgRepository } from "@/repositorys/org-repository"
import { Org } from "@prisma/client"
import { OrgNotFoundError } from "../errors/org-not-found-error"

interface OrgFetchResponse{
    orgs: Org[]
}

export class FetchOrgService{
    constructor(private orgRepository: OrgRepository){}
    async execute(city: string): Promise<OrgFetchResponse>{
        const orgs = await this.orgRepository.findByCity(city.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase())
        if(orgs.length === 0){
            throw new OrgNotFoundError()
        }
        //console.log(orgs)
        return { orgs }
    }
}
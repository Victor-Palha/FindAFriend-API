import { OrgRepository } from "@/repositorys/org-repository"
import { Org } from "@prisma/client"
import { compare } from "bcryptjs"
import { InvalidCredencialsError } from "../users/errors/invalid-credencials-error"

interface OrgAuthRequest{
    email: string
    password: string
}

interface OrgAuthResponse{
    org: Org
}

export class OrgAuthService{
    constructor(private orgRepository: OrgRepository){}
    async execute({email, password}: OrgAuthRequest): Promise<OrgAuthResponse>{

        const org = await this.orgRepository.findByEmail(email)

        if(!org){
            throw new InvalidCredencialsError
        }

        const passwordMatch = await compare(password, org.password)
        
        if(!passwordMatch){
            throw new InvalidCredencialsError
        }
        return { org }

    }
}
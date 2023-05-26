import { OrgRepository } from "@/repositorys/org-repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from "bcryptjs";
import { ValidateCep } from "@/utils/validate-cep";
import { InvalidCEPError } from "./errors/invalid-cep-error";
import { validateCnpj } from "@/utils/validate-cnpj";
import { InvalidCnpjError } from "./errors/invalid-cnpj-error";

interface OrgRegisterRequest{
    name: string
    email: string
    password: string
    address: string
    cnpj: string
    cep: string
    city: string
    phone: string
}

interface OrgRegisterResponse{
    org: Org
}

export class OrgRegisterService{
    constructor(private orgRepository: OrgRepository){}
    async execute({name, email, password, address, cnpj, cep, city, phone}: OrgRegisterRequest): Promise<OrgRegisterResponse>{
        //validate
        let orgAlreadyExists = await this.orgRepository.findByCNPJ(cnpj)
        
        if(orgAlreadyExists){
            throw new OrgAlreadyExistsError
        }
        orgAlreadyExists = await this.orgRepository.findByEmail(email)

        if(orgAlreadyExists){
            throw new OrgAlreadyExistsError
        }

        const responseCep = await ValidateCep(cep)
        
        if(responseCep.cep === undefined){
            throw new InvalidCEPError
        }

        const responseCnpj = await validateCnpj(cnpj)

        if(responseCnpj.code != 200){
            throw new InvalidCnpjError
        }

        if(name.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase() !== responseCnpj.data[0].nome_fantasia.normalize("NFD").toUpperCase()){
            throw new InvalidCnpjError
        }

        //create
        const passwordHash = await hash(password, 8)
        const org = await this.orgRepository.create({
            name,
            email,
            password: passwordHash,
            address,
            cnpj,
            cep,
            city,
            phone,
        })

        return { org }
    }
}
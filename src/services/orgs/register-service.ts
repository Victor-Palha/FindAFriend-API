import { OrgRepository } from "@/repositorys/org-repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from "bcryptjs";
import { ValidateCep } from "@/utils/validate-cep";
import { InvalidCEPError } from "./errors/invalid-cep-error";
import { validateCnpj } from "@/utils/validate-cnpj";
import { InvalidCnpjError } from "./errors/invalid-cnpj-error";
import { UserRepository } from "@/repositorys/users-repository";

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
    constructor(private orgRepository: OrgRepository, private userRepository: UserRepository){}
    async execute({name, email, password, address, cnpj, cep, city, phone}: OrgRegisterRequest): Promise<OrgRegisterResponse>{
        //validate
        let orgAlreadyExists = await this.orgRepository.findByCNPJ(cnpj)
        
        if(orgAlreadyExists){
            throw new OrgAlreadyExistsError
        }
        orgAlreadyExists = await this.orgRepository.findByEmail(email)

        let userAlreadyExists = await this.userRepository.findByEmail(email)
        if(userAlreadyExists){
            throw new OrgAlreadyExistsError
        }

        if(orgAlreadyExists){
            throw new OrgAlreadyExistsError
        }

        const responseCep = await ValidateCep(cep)
        //console.log(responseCep)
        
        if(responseCep.cep === undefined || responseCep.localidade.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase() !== city.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase()){
            throw new InvalidCEPError
        }

        // const responseCnpj = await validateCnpj(cnpj)
        // console.log(responseCnpj)

        // if(responseCnpj.code != 200){
        //     throw new InvalidCnpjError
        // }

        // if(name.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase() !== responseCnpj.data[0].nome_fantasia.normalize("NFD").toUpperCase()){
        //     throw new InvalidCnpjError
        // }

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
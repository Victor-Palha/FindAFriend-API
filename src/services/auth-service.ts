import { OrgRepository } from "@/repositorys/org-repository";
import { UserRepository } from "@/repositorys/users-repository";
import { Org, User } from "@prisma/client";
import { InvalidCredencialsError } from "./errors/invalid-credencials-error";
import { compare } from "bcryptjs";

interface AuthRequest{
    email: string;
    password: string;
}

interface AuthResponse{
    auth: {
        id: string;
        name: string;
        type: string;
    }
}

export class AuthService{
    constructor(private userRepository: UserRepository, private orgRepository: OrgRepository){}

    async execute({email, password}: AuthRequest): Promise<AuthResponse>{
        // verify
        const user = await this.userRepository.findByEmail(email)
        const org = await this.orgRepository.findByEmail(email)

        //console.log(user, org)

        if(!user && !org){
            throw new InvalidCredencialsError
        }

        let auth = {
            id: "",
            name: "",
            type: "",
        }
        
        if(user){
            const passwordMatch = await compare(password, user.password)
            if(!passwordMatch){
                throw new InvalidCredencialsError
            }
            auth = {
                id: user.id_user,
                name: user.name,
                type: "MEMBER",
            }

        } else if(org){
            const passwordMatch = await compare(password, org.password)
            if(!passwordMatch){
                throw new InvalidCredencialsError
            }
            auth = {
                id: org.id_org,
                name: org.name,
                type: "ORG",
            }
        }

        return { auth }
    }
}
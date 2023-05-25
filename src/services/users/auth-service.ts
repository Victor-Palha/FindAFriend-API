import { UserRepository } from "@/repositorys/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredencialsError } from "./errors/invalid-credencials-error";

interface AuthUserRequest{
    email: string;
    password: string;
}

interface AuthUserResponse{
    user: User
}

export class UserAuthService {
    constructor(private userRepository: UserRepository) {}

    async execute(data: AuthUserRequest): Promise<AuthUserResponse>{

        const user = await this.userRepository.findByEmail(data.email)
        //console.log(user)
        if(!user){
            throw new InvalidCredencialsError
        }

        const passwordMatch = await compare(data.password, user.password)
        //console.log(passwordMatch)
        if(!passwordMatch){
            throw new InvalidCredencialsError
        }

        return { user }
    }
}
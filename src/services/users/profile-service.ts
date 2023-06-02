import { UserRepository } from "@/repositorys/users-repository";
import { User } from "@prisma/client";
import { InvalidCredencialsError } from "../errors/invalid-credencials-error";

interface UserProfileRequest{
    user_id: string;
}

interface UserProfileResponse{
    user: User
}

export class UserProfileService {
    constructor(private userRepository: UserRepository) {}

    async execute({user_id}: UserProfileRequest): Promise<UserProfileResponse>{

        const user = await this.userRepository.findById(user_id)
        if(!user){
            throw new InvalidCredencialsError
        }

        return { user }
    }
}
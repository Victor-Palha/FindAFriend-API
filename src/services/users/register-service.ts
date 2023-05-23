import { UserRepository } from '@/repositorys/users-repository';
import {hash} from 'bcryptjs';
type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    cpf: string;
}

export class UserRegisterService{
    constructor(private userRepository: UserRepository){}
    async execute({name, email, password, cpf}: RegisterRequest){
        const passwordHash = await hash(password, 8)

        //validate
        const userAlreadyExists = await this.userRepository.findByCpf(cpf)
        if(userAlreadyExists){
            throw new Error('User already exists')
        }

        //create
        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            cpf
        })

        return {user}
    }
}
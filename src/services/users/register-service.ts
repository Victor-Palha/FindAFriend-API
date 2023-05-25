import { UserRepository } from '@/repositorys/users-repository';
import {hash} from 'bcryptjs';
import { UserAlreadyExists } from './errors/user-already-exists-error';
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

        //validate user

        let userAlreadyExists = await this.userRepository.findByCpf(cpf)
        if(userAlreadyExists){
            throw new UserAlreadyExists
        }

        userAlreadyExists = await this.userRepository.findByEmail(email)
        if(userAlreadyExists){
            throw new UserAlreadyExists
        }


        //create
        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            cpf
        })

        return { user }
    }
}
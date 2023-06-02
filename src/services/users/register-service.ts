import { UserRepository } from '@/repositorys/users-repository';
import {hash} from 'bcryptjs';
import { UserAlreadyExists } from '../errors/user-already-exists-error';
import { User } from '@prisma/client';
//import { validateCpf } from '@/utils/validate-cpf';
import { InvalidCredencialsError } from '../errors/invalid-credencials-error';
import { OrgRepository } from '@/repositorys/org-repository';

type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    cpf: string;
}
type RegisterResponse ={
    user:User
}

export class UserRegisterService{
    constructor(private userRepository: UserRepository, private orgRepository: OrgRepository){}
    async execute({name, email, password, cpf}: RegisterRequest): Promise<RegisterResponse>{
        
        //validate user
        
        let userAlreadyExists = await this.userRepository.findByCpf(cpf)
        if(userAlreadyExists){
            throw new UserAlreadyExists
        }

        userAlreadyExists = await this.userRepository.findByEmail(email)
        if(userAlreadyExists){
            throw new UserAlreadyExists
        }
        let userAlreadyExistsOrg = await this.orgRepository.findByEmail(email)
        if(userAlreadyExistsOrg){
            throw new UserAlreadyExists
        }
        
        // const response = await validateCpf({cpf, birthdate})
        // if(response.code != 200){
        //     throw new InvalidCredencialsError
        // }
        // //console.log(name.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase() + " " + " " +response.data[0].nome.normalize("NFD").toUpperCase())
        // if(name.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toUpperCase() !== response.data[0].nome.normalize("NFD").toUpperCase()){
        //     throw new InvalidCredencialsError
        // }
        
        //create
        const passwordHash = await hash(password, 8)
        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            cpf
        })

        return { user }
    }
}
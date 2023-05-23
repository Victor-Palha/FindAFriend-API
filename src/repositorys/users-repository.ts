import {Prisma, User} from '@prisma/client';

export interface UserRepository{
    create(data: Prisma.UserCreateInput): Promise<User>
    findByCpf(cpf: string): Promise<User | null>
    findById(id: string): Promise<User | null>
}
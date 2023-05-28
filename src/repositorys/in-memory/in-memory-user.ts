import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { randomUUID } from "crypto";


export class InMemoryUserRepository implements UserRepository{
    public items: User[] = []

    async create(data: Prisma.UserUncheckedCreateInput){
        const user = {
            id_user: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            cpf: data.cpf,
            created_at: new Date(),
        }

        this.items.push(user)
        return user
    }
    async findByCpf(cpf: string){
        const user = this.items.find(user => user.cpf === cpf)
        return user || null
    }

    async findById(id: string){
        const user = this.items.find(user => user.id_user === id)
        return user || null
    }

    async findByEmail(email: string){
        const user = this.items.find(user => user.email === email)
        return user || null
    }

}
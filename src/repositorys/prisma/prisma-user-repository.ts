import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository{
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })

        return user
    }
    async findByCpf(cpf: string) {
        const user = await prisma.user.findUnique({
            where:{
                cpf
            }
        })

        return user
    }
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where:{
                id_user: id
            },include:{
                pets:true
            }
        })

        return user
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        return user
    }
    
}
import { FastifyInstance } from "fastify";
import { userRegister } from "./register-controller";

export async function routesUsers(app: FastifyInstance){

    app.post("/signup/user", userRegister)
}
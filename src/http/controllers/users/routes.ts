import { FastifyInstance } from "fastify";
import { userRegister } from "./register-controller";
import { AuthUser } from "../auth-user-controller";
import { profileUser } from "./profile-user-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { contactToAdoption } from "./contact-controller";

export async function routesUsers(app: FastifyInstance){

    app.post("/signup/user", userRegister)
    app.post("/signin", AuthUser)
    app.get("/profile/user", {onRequest: [verifyJWT]}, profileUser)
    app.get("/contact/:id_pet", {onRequest: [verifyJWT]}, contactToAdoption)
}
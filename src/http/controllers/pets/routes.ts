import { FastifyInstance } from "fastify";
import { registerPet } from "./register-pet-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { detailsPet } from "./details-pet-controllet";
import { fetchPets } from "./fetch-pets-controller";

export async function petRoutes(app: FastifyInstance){
    app.post("/pet", {onRequest: [verifyJWT, verifyUserRole("ORG")]}, registerPet)
    app.get("/pet/:id_pet", detailsPet)
    app.get("/pet/fetch", fetchPets)
}
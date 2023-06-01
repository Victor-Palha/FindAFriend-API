import { FastifyInstance } from "fastify";
import { registerOrg } from "./register-controller";
import { fetchOrgs } from "./fetch-orgs-controller";
import { adoptionPet } from "./adoption-controller";
import { detailsOrg } from "./details-org-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function orgRoutes(app: FastifyInstance){
    app.post("/signup/org", registerOrg)
    app.patch("/org/:cpf/:pet_id", {onRequest: [verifyJWT, verifyUserRole("ORG")]}, adoptionPet)
    app.get("/orgs/fetch", fetchOrgs)
    app.get("/org/:id", detailsOrg)
}
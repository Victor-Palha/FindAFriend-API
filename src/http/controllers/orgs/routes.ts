import { FastifyInstance } from "fastify";
import { registerOrg } from "./register-controller";
import { fetchOrgs } from "./fetch-orgs-controller";

export async function orgRoutes(app: FastifyInstance){
    app.post("/signup/org", registerOrg)
    app.get("/orgs/city", fetchOrgs)
}
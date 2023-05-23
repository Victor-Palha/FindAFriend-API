import fastify from "fastify";
import { routesUsers } from "./http/controllers/users/routes";

export const app = fastify()

app.register(routesUsers)
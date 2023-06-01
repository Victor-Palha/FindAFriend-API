import fastify from "fastify";
import { routesUsers } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { petRoutes } from "./http/controllers/pets/routes";
import { orgRoutes } from "./http/controllers/orgs/routes";

export const app = fastify()

//token
app.register(fastifyJwt, {
    secret: env.JWT_TOKEN,
    sign:{
        expiresIn: "7d",
    }
})

app.register(routesUsers)
app.register(petRoutes)
app.register(orgRoutes)

app.setErrorHandler((error, _req, res)=>{
    if(error instanceof ZodError){
        return res.status(400).send({error: "Validation Error", details: error.issues})
    }

    if(env.NODE_ENV !== "production"){
        console.error(error)
    } else{
        //
    }

    return res.status(500).send({message: "Internal Server Error"})
})
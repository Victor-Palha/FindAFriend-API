import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    JWT_TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.log("Invalid environment variables")
    throw new Error("Invalid environment variables")
}

export const env = _env.data
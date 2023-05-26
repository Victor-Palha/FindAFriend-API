import { env } from "@/env";
import { URLSearchParams } from "url";

interface validateCpfRequest{
    cpf: string
    birthdate: string
}
export async function validateCpf({cpf, birthdate}: validateCpfRequest){
    const args = {
        cpf,
        birthdate,
        token: env.TOKEN_API,
        timeout: "600"
    }

    const response = await fetch(`https://api.infosimples.com/api/v2/consultas/receita-federal/cpf?`+ new URLSearchParams(args), {
        method: "POST",
    })

    return response.json()
}
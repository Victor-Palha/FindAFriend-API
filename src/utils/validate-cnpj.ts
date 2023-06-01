// import { env } from "@/env";
// import { URLSearchParams } from "url";


// export async function validateCnpj(cnpj: string){
//     const args = {
//         cnpj,
//         token: env.TOKEN_API,
//         timeout: "600"
//     }

//     const response = await fetch(`https://api.infosimples.com/api/v2/consultas/receita-federal/cnpj?`+ new URLSearchParams(args), {
//         method: "POST",
//     })

//     return response.json()
// }
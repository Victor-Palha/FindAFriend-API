interface CepResponse{
    cep: string
    logradouro: string 
    complemento: string 
    bairro: string 
    localidade: string 
    uf: string 
    ibge: string 
    gia: string 
    ddd: string 
    siafi: string  
}
export async function ValidateCep(cep: string): Promise<CepResponse>{
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    return response.json()
}
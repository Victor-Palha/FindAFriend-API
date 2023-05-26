export class InvalidCnpjError extends Error{
    constructor(){
        super("Invalid CNPJ")
    }
}
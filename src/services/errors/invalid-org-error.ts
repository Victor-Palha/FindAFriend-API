export class InvalidOrgError extends Error{
    constructor(){
        super("Org not found")
    }
}
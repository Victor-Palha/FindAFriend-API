export class OrgNotFoundError extends Error{
    constructor(){
        super("Org not found")
    }
}
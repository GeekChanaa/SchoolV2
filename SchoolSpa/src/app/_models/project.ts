import { User } from "./user";

export interface Project{
    id : number,
    userID : number,
    name : string,
    description : string,
    user : User
}
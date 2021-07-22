import { Project } from "./project";
import { User } from "./user";

export interface ProjectColumn{
    id : number,
    name : string,
    description : string,
    projectID : number,
    userID : number,
    project : Project,
    user : User
}
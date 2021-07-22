import { Project } from "./project";
import { User } from "./user";

export interface ProjectMember{
    id : number,
    projectID : number, 
    userID : number,
    project : Project,
    user : User
}
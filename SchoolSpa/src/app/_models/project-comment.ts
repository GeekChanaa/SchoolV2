import { Project } from "./project";
import { User } from "./user";

export interface ProjectComment{
    id : number,
    content : string,
    projectID : number,
    userID : number,
    project : Project,
    user : User
}
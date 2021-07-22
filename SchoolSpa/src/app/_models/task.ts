import { ProjectColumn } from "./project-column";
import { User } from "./user";

export interface Task{
    id : number,
    name : string,
    description : string,
    projectColumnID : number,
    userID : number,
    projectColumn : ProjectColumn,
    user : User
}
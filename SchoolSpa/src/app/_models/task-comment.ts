import { Task } from "./task";
import { User } from "./user";

export interface TaskComment{
    id : number,
    content : string,
    taskID : number,
    userID : number,
    task : Task,
    user : User
}
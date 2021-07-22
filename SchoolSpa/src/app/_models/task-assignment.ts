import { Task } from "./task";
import { User } from "./user";

export interface TaskAssignment{
    id : number,
    userID : number,
    taskID : number,
    user : User,
    task : Task
}
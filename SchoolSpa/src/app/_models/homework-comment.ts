import { Homework } from "./homework";
import { User } from "./user";

export interface HomeworkComment{
    id : number,
    userID : number,
    homeworkID : number,
    user : User,
    homework : Homework,
    content : string,
}
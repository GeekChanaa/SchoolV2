import { User } from "./user";

export interface Notification{
    id : number,
    action : string,
    actionOn : string,
    description : string,
    time : Date,
    status : string,
    userID : number,
    user : User
}
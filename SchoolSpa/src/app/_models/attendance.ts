import { SubModule } from "./sub-module";
import { User } from "./user";

export interface Attendance{
    id : number,
    userID : number
    subModuleID : number
    from : Date,
    to : Date,
    user : User,
    subModule : SubModule
}
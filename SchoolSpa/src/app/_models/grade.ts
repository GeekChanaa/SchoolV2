import { Student } from "./student";
import { SubModule } from "./sub-module";

export interface Grade{
    id : number,
    value : number,
    subModuleID : number,
    studentID : number,
    student : Student,
    subModule : SubModule
}
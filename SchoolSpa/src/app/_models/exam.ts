import { Classroom } from "./classroom";
import { SubModule } from "./sub-module";

export interface Exam{
    id : number,
    classroomID : number,
    subModuleID : number,
    from : Date,
    to : Date,
    descriptions : string,
    classroom : Classroom,
    subModule : SubModule
}
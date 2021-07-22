import { Classroom } from "./classroom";
import { SubModule } from "./sub-module";

export interface Assignment{
    id : number,
    description : string,
    subModuleID : number,
    classroomID : number,
    classroom : Classroom,
    subModule : SubModule
}
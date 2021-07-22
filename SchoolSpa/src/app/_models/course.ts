import { Classroom } from "./classroom";
import { SubModule } from "./sub-module";
import { Teacher } from "./teacher";
import { Training } from "./training";

export interface Course{
    id : number,
    name : string,
    description : string,
    teacherID : number,
    classroomID : number,
    subModuleID : number,
    trainingID : number,
    teacher : Teacher,
    classroom : Classroom,
    subModule : SubModule,
    training : Training
}
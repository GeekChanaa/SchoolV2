import { SubModule } from "./sub-module";
import { Training } from "./training";

export interface Classroom{
    id : number,
    trainingID : number,
    description : string,
    subModuleID : number,
    training : Training,
    subModule : SubModule
}
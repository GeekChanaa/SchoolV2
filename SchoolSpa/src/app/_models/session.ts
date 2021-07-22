import { SubModule } from "./sub-module";
import { Training } from "./training";

export interface Session{
    id : number,
    from : Date,
    to : Date,
    trainingID : number,
    subModuleID : number,
    training : Training,
    subModule : SubModule
}
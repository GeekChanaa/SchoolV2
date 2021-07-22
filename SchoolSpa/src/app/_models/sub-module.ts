import { Module } from "./module";

export interface SubModule{
    id : number,
    name : string,
    description : string,
    moduleID : number,
    module : Module
}
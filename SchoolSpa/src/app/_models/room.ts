import { School } from "./school";

export interface Room{
    id : number,
    name : string,
    code : string,
    schoolID : number,
    school : School
}
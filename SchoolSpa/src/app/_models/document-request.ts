import { Student } from "./student";

export interface DocumentRequest{
    id : number,
    studentID : number,
    description : string,
    type : string,
    student : Student
}
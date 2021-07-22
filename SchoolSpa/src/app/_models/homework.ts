import { Course } from "./course";

export interface Homework{
    id : number,
    name : string,
    courseID : number,
    description : string,
    dueDate : Date,
    course : Course
}
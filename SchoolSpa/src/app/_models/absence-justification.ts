import { Attendance } from "./attendance";

export interface AbsenceJustification{
    id : number,
    attendanceID : number,
    attendance : Attendance,
    description : string
}
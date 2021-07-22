import { User } from "./user";

export interface Student{
    id : number,
    userID : number,
    dateOfBirth : Date,
    placeOfBirth : string,
    sex : string,
    phone : string,
    email : string,
    address : string,
    fatherName : string,
    motherName : string,
    fatherPhone : string,
    motherPhone : string,
    fatherProfession : string,
    motherProfession : string,
    fatherPlaceOfWork : string,
    motherPlaceOfWork : string,
    user : User
}
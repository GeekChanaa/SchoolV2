import { User } from "./user";

export interface Mail{
    id : number,
    receiverID : number,
    senderID : number,
    subject : string,
    title : string,
    content : string,
    receiver : User,
    sender : User
}
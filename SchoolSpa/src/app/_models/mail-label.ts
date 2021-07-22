import { Label } from "./label";
import { Mail } from "./mail";

export interface MailLabel{
    id : number,
    mailID : number,
    labelID : number,
    mail : Mail,
    label : Label
}
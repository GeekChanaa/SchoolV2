import { Country } from "./country";

export interface State{
    id : number,
    countryID : number,
    name : string,
    state_code : string,
    country : Country,
}
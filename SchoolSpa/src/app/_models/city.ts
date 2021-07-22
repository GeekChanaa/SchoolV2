import { State } from "./state";

export interface City{
    id : number,
    name : string,
    latitude : string,
    longitude : string,
    stateID : number,
    state : State
}
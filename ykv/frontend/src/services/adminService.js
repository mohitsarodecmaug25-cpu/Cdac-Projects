import axios from "axios";
import {ATHLETES_COACHES_URL} from "../constants/APIConstants.js";


export function getAthletesCoaches(){
    return axios.get(ATHLETES_COACHES_URL);
}
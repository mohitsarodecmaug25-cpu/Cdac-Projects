import axios from "axios";
import {SPORT_API_URL} from "../constants/APIConstants.js";
import { getToken } from "./tokenService.js";


export function getAllSports(){

    const token=getToken();
    return axios.get(SPORT_API_URL,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
}

export function deleteSport(id)
{   const token=getToken();
    return axios.delete(`${SPORT_API_URL}/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
}

export function getProductById(id){
    const token=getToken();
    return axios.get(`${SPORT_API_URL}/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
}


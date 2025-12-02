import axios from "axios";
import { BOOKS_API_URL } from "../constants/APIConstants";




export async function getAllProducts() {
  return axios.get(BOOKS_API_URL);
}

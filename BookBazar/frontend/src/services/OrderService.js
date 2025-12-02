import axios from "axios";
import { ORDER_API_URL } from "../constants/APIConstants";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${ORDER_API_URL}/user`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${ORDER_API_URL}/create`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstants";

export const getAthletesByCoach = (coachId) => {
    return axios.get(`${API_BASE_URL}/coaches/${coachId}/athletes`);
};

export const getRequestsByCoach = (coachId) => {
    return axios.get(`${API_BASE_URL}/coaches/${coachId}/requests`);
};

export const updateRequestStatus = (requestId, status) => {
    return axios.put(`${API_BASE_URL}/coach/requests`, {
        request_id: requestId,
        status: status
    });
};
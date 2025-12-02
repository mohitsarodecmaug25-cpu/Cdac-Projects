import axios from "axios";
import { API_BASE_URL } from "../constants/APIConstants";

export const getAthleteEnrollments = (athleteId) => {
    return axios.get(`${API_BASE_URL}/athletes/${athleteId}/enrollments`);
};

export const sendSportRequest = (athleteId, coachId, sportId) => {
    return axios.post(`${API_BASE_URL}/athlete_sports`, {
        athlete_id: athleteId,
        coach_id: coachId,
        sport_id: sportId
    });
};
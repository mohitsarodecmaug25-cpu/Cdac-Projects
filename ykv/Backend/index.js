import express from 'express';
import { connectDb } from './src/configs/DbConfig.js';
import { addSport, deleteSportById, getAllSports, getSportById, updateSport } from './src/controllers/SportController.js';
import { registerAthlete,setAthleteSport, getAthleteEnrollments } from './src/controllers/AthleteController.js';
import {  registerAdmin } from './src/controllers/AdminController.js';
import cors from 'cors';
import { authorize,verifyToken } from './src/middlewares/VerifyToken.js';
import { registerCoach,getCoachesBySport, getAllDetails, getAthletesByCoach, getRequestsByCoach, updateRequestStatus} from './src/controllers/CoachController.js';
import { login } from './src/controllers/loginController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/admin", verifyToken,authorize(["admin"]),registerAdmin);

app.post("/login", login);





app.get("/sports", getAllSports);
app.get("/sports/:id",verifyToken,authorize(["admin","athlete","coach"]), getSportById);
app.post("/sports",verifyToken,authorize(["admin"]), addSport);
app.delete("/sports/:id", verifyToken,authorize(["admin"]), deleteSportById);
app.put("/sports/:id",verifyToken,authorize(["admin"]), updateSport);







app.post("/athletes", registerAthlete);
app.get("/athletes/:athlete_id/enrollments", getAthleteEnrollments);

app.get("/coaches/:sport_id",getCoachesBySport);
app.post("/coaches", registerCoach);
app.get("/coaches_details",getAllDetails);
app.get("/coaches/:coach_id/athletes", getAthletesByCoach);
app.get("/coaches/:coach_id/requests", getRequestsByCoach);
app.put("/coach/requests", updateRequestStatus);

app.post("/athlete_sports",setAthleteSport); 


app.listen(7655,()=>{
    connectDb();
})

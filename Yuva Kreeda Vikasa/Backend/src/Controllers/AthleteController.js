import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerAthlete(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, age, gender, email, phone, password } = request.body;
        const encryptedPassword = hashSync(password, 12);
        const qry = `INSERT INTO athletes( name, age,gender, email,phone, password) VALUES('${name}',${age},'${gender}','${email}','${phone}','${encryptedPassword}')`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Registration succesfull, now you can login' });
        }
        else {
            response.status(500).send({ message: 'Athlete registration failed' });
        }
    } catch (error) {
        console.log(error);
         if (error.errno === 1062) {
            response.status(400).send({ message: "Athlete with this id already exists " })
        }
        else {
        response.status(500).send({ message: 'Something went wrong' });
        }
    }
}

// export async function athleteLogin(request, response) {
//     try {
//         const connection = getConnectionObject();
//         const { phone, password } = request.body;
//         const qry = `SELECT * FROM athletes WHERE phone='${phone}'`;
//         const [rows] = await connection.query(qry);
//         if (rows.length === 0) {
//             response.status(400).send({ message: "Login failed, phone doesn't exist" });
//         }
//         else {
//             if (compareSync(password, rows[0].password)) {
//                 const token = jwt.sign({ customerId: rows[0].id }, 'user1234');
//                 response.status(200).send({ token, message: 'Login successful' });
//             }
//             else {
//                 response.status(400).send({ message: "Login failed, password is invalid" });
//             }

//         }
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({ message: 'Something went wrong' });
//     }
// }


export async function setAthleteSport(req, res) {
    try {
        let conn = getConnectionObject();
        const { athlete_id, coach_id, sport_id } = req.body;

        if (!athlete_id || !coach_id || !sport_id) {
            return res.status(400).send({ error: "All fields are required" });
        }
        const qry = `INSERT INTO athlete_sports (athlete_id, coach_id, sport_id, status) VALUES (${athlete_id}, ${coach_id}, ${sport_id}, 'pending')`;
        let [result] = await conn.query(qry);

        if (result.affectedRows == 1) {
            res.status(200).send({ message: "Request sent to coach successfully" })
        }
        else {
            res.status(500).send({ message: "Request failed" });

        }
    }
    catch (err) {
       
            res.status(500).send({ message: "Something went wrong" });
        
    }



};

export async function getAthleteEnrollments(req, res) {
    try {
        let conn = getConnectionObject();
        const athleteId = req.params.athlete_id;
        const qry = `SELECT s.name as sport_name, c.name as coach_name, asg.status 
                     FROM athlete_sports asg 
                     JOIN sports s ON asg.sport_id = s.id 
                     JOIN coaches c ON asg.coach_id = c.id 
                     WHERE asg.athlete_id = ${athleteId}`;
        const [rows] = await conn.query(qry);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}



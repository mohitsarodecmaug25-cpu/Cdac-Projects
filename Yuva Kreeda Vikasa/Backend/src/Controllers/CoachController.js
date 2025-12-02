import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerCoach(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, experience, email, phone, password, sport_id } = request.body;
        const encryptedPassword = hashSync(password, 12);
        console.log(request.body);
        const qry = `INSERT INTO coaches( name, experience, email,phone, password,sport_id) VALUES('${name}',${experience},'${email}','${phone}','${encryptedPassword}',${sport_id})`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Registration succesfull, now you can login' });
        }
        else {
            response.status(500).send({ message: 'Coach registration failed' });
        }
    } catch (error) {
        console.log(error);
        if (error.errno === 1062) {
            response.status(400).send({ message: "Coach with this id already exists " })
        }
        else {
            console.log(error);
            response.status(500).send({ message: 'Something went wrong' });
        }
    }
}

// export async function coachLogin(request, response) {
//     try {
//         const connection = getConnectionObject();
//         const { phone, password } = request.body;
//         const qry = `SELECT * FROM coaches WHERE phone='${phone}'`;
//         const [rows] = await connection.query(qry);
//         if (rows.length === 0) {
//             response.status(400).send({ message: "Login failed, phone doesn't exist" });
//         }
//         else {
//             if(compareSync(password,rows[0].password)){
//                 const token = jwt.sign({customerId:rows[0].id},'user1234');
//                 response.status(200).send({token,message:'Login successful'});
//             }
//             else{
//                 response.status(400).send({ message: "Login failed, password is invalid" });
//             }
//             // compare the password
//         }
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({ message: 'Something went wrong' });
//     }
// }


export async function getCoachesBySport(req, res) {
    try {
        let conn = getConnectionObject();
        const qry = `select id,name,email,phone,experience from coaches where sport_id=${req.params.sport_id}`;
        let [rows] = await conn.query(qry);

        if (rows.length == 0) {
            res.status(500).send({ message: "No coaches found" });
        }
        else {
            res.status(200).send(rows);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
};


export async function getAllDetails(req, res) {
    try {
        let conn = await getConnectionObject();

        const qry = `SELECT 
    c.id,
    c.name AS CoachName,
    s.name,
    a.id,
    a.name AS AthleteName,
    a.gender,
    a.age
FROM athlete_sports AS asg
JOIN coaches AS c ON asg.coach_id = c.id
JOIN sports AS s ON asg.sport_id = s.id
JOIN athletes AS a ON asg.athlete_id = a.id
WHERE asg.status = 'approved'
ORDER BY c.id, a.id`;
        const [rows] = await conn.query(qry);
        console.log(rows);
        if (rows.length === 0) {
            res.status(500).send({ message: "No data found" })
        }
        else {
            res.status(200).send(rows);
        }

    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });

    }
}

export async function getAthletesByCoach(req, res) {
    try {
        let conn = getConnectionObject();
        const coachId = req.params.coach_id;
        const qry = `SELECT a.id, a.name, a.age, a.gender, s.name as sport_name 
                     FROM athlete_sports asg 
                     JOIN athletes a ON asg.athlete_id = a.id 
                     JOIN sports s ON asg.sport_id = s.id 
                     WHERE asg.coach_id = ${coachId} AND asg.status = 'approved'`;
        const [rows] = await conn.query(qry);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}

export async function getRequestsByCoach(req, res) {
    try {
        let conn = getConnectionObject();
        const coachId = req.params.coach_id;
        const qry = `SELECT asg.id, a.name as athlete_name, a.age, a.gender, s.name as sport_name, asg.status 
                     FROM athlete_sports asg 
                     JOIN athletes a ON asg.athlete_id = a.id 
                     JOIN sports s ON asg.sport_id = s.id 
                     WHERE asg.coach_id = ${coachId} AND asg.status = 'pending'`;
        const [rows] = await conn.query(qry);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}

export async function updateRequestStatus(req, res) {
    try {
        let conn = getConnectionObject();
        const { request_id, status } = req.body;
        const qry = `UPDATE athlete_sports SET status = '${status}' WHERE id = ${request_id}`;
        const [result] = await conn.query(qry);
        if (result.affectedRows === 1) {
            res.status(200).send({ message: `Request ${status} successfully` });
        } else {
            res.status(500).send({ message: "Failed to update request" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}


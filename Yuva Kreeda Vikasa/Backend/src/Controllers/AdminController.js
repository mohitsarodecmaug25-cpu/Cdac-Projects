import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerAdmin(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, password, email } = request.body;
        const encryptedPassword = hashSync(password, 12);
        const qry = `INSERT INTO admin(name,phone,password,email) VALUES('${name}','${phone}','${encryptedPassword}','${email}')`;
        const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Admin registered' });
        }
        else {
            response.status(500).send({ message: 'Admin registration failed' });
        }
    } catch (error) {
        console.log(error);
         if (error.errno === 1062) {
            response.status(400).send({ message: "admin with this id already exists " })
        }
        else {
        response.status(500).send({ message: 'Something went wrong' });
        }
    }
}

// export async function adminLogin(request, response) {
//     try {
//         const connection = getConnectionObject();
//         const { phone, password } = request.body;
//         const qry = `SELECT * FROM admin WHERE phone='${phone}'`;
//         const [rows] = await connection.query(qry);
//         if (rows.length === 0) {
//             response.status(400).send({ message: "Login failed, phone doesn't exist" });
//         }
//         else {
//             if(compareSync(password,rows[0].password)){
//                 const token = jwt.sign({adminId:rows[0].id},'user1234');
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


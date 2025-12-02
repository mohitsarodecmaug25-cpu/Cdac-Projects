import { getConnectionObject } from '../configs/dbConfig.js';

export async function getAllSports(req, res) {
    let conn = getConnectionObject();
    try {
        const qry = `Select * from sports`;
        const [rows] = await conn.query(qry);
        res.status(200).send(rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something  went Wrong" });
    }
}
export async function insertSport(req, res) {
    try {
        let conn=getConnectionObject();
        let {name,description}=req.body;
        const qry = `INSERT INTO SPORTS(name,description) VALUES('${name}','${description}')`;
        const [result] = await conn.query(qry);
        if (result.affectedRows==1) {
            res.status(200).send({ message: "Sport added successfully" });
        }
        else {
            res.status(500).send({ message: "Sport addition failed" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went Wrong" });
    }
}
export async function deleteSport(req, res) {
    try {
        let conn=getConnectionObject();
        const qry = `delete from SPORTS where id=${req.params.id}`;
        const [result] = await conn.query(qry);
        if (result.affectedRows==1) {
            res.status(200).send({ message: "Sport deleted successfully" });
        }
        else {
            res.status(500).send({ message: "Sport deletion failed" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went Wrong" });
    }
}



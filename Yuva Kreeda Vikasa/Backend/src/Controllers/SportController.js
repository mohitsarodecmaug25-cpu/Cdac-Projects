import { getConnectionObject } from "../configs/DbConfig.js";

export async function addSport(request, response){
    try {
        const connection = getConnectionObject();
        const {name,description} = request.body;
        const qry = `INSERT INTO sports(name,description) VALUES('${name}','${description}')`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Sport Added'});
        }
        else{
            response.status(500).send({message:'Cannot add Sport at this time'});
        }
    } catch (error) {
        console.log(error);
         if (error.errno === 1062) {
            response.status(400).send({ message: "Sport with this id already exists " })
        }
        else {
        response.status(500).send({message:'Something went wrong'});
        }
    }
}

export async function updateSport(request, response){
try {
        const connection = getConnectionObject();
        const {id,name,description} = request.body;
        const qry = `UPDATE sports SET name='${name}', description="${description}" WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Sport Updated'});
        }
        else{
            response.status(500).send({message:'Sport update operation failed'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getAllSports(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM sports`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getSportById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM sports WHERE id=${request.params.id}`;
        const [rows] = await connection.query(qry);
        if(rows.length === 0){
            response.status(404).send({message:'Sport not found'});
        }
        else{
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}


export async function deleteSportById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM Sports WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Sport Deleted'});
        }
        else{
            response.status(404).send({message:'Sport not found'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}
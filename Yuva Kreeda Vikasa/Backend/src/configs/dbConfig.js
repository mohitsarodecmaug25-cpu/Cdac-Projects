import { createConnection } from "mysql2/promise";

let connection = null;

export async function connectDb() {
    try {
        connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'cdac',
            port: 3306,
            database: 'yuva_kreeda_vikas'
        });
        console.log("database connected");
    } catch (error) {
        console.log("Error in db connection");
        console.log(error);
    }
}

export function getConnectionObject(){
    return connection;
}

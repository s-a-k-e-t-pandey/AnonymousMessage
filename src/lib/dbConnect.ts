import mongoose, { Connection } from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}


const connection: ConnectionObject = {};

async function dbConnect() : Promise<void>{
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log("Db Connected Successfully");   
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default dbConnect;
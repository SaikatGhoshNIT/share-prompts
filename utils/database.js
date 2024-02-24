import  Mongoose  from "mongoose";

let isConnected = false; // track the connection

export const  connectToDB = async () =>{
    Mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("MongoDB is connected");
        return;
    }

    try {
        await Mongoose.connect(process.env.MongoDB_URI, {
            dbName : "Share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected =true
        console.log("MongoDB connected");

    } catch (error) {
        
    }
}
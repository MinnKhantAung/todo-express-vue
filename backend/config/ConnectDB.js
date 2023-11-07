import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL);

        console.log(`Database is connected : ${connect.connection.host }`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}
import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js'
import { ConnectDB } from './config/ConnectDB.js';
import { ErrorHandler } from './middlewares/ErrorHandler.js'

dotenv.config();
ConnectDB();

//define port
const port = process.env.PORT;



const app = express();

//middleware
app.use(express.json())
app.use(ErrorHandler)

//define route
app.use('/user', UserRoute)

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})
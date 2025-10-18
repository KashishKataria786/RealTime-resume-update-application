import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import connectDatabase from './config/db.js'
import colors from 'colors'
const app = express();

dotenv.config();
app.use(morgan('combined'));
app.use(cors());


await connectDatabase();

const PORT = process.env.PORT ||5005

if(process.env.NODE_ENV !=='production'){
    app.listen(PORT, (req,res)=>{
        console.log(`Server started at PORT ${PORT}`)
    })
}
export default app;
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import connectDatabase from './config/db.js'
import colors from 'colors'
import userRouter from './routes/user.routes.js';
const app = express();

dotenv.config();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
await connectDatabase();

app.get('/', (req,res)=>{
    res.send("<h1>Server For Resume Application</h1>")
})
app.use('/api/auth',userRouter);

const PORT = process.env.PORT ||5005

if(process.env.NODE_ENV !=='production'){
    app.listen(PORT, (req,res)=>{
        console.log(`Server started at PORT ${PORT}`)
    })
}
export default app;
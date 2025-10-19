import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import morgan from 'morgan'
import stimulatorRouter from './routes/stimulator.routes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.get('/', (req,res)=>{res.send("<h1>Stimulator Website backend</h1>")})
app.use('/api',stimulatorRouter);

const PORT = process.env.PORT || 5001
if(process.env.NODE_ENV !=='production'){
    app.listen(PORT, ()=>{
        console.log(`Server started at ${PORT}`)
    })
}
export default app;